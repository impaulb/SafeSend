/**
 * Callback for rendering the card for the compose action dialog.
 * @param {Object} e The event object.
 * @return {CardService.Card} The card to show to the user.
 */
function onGmailCompose(e) {
  var header = CardService.newCardHeader()
      .setTitle('Redact email')
      .setSubtitle('Press the button to find all sensitive information in your email text.');

  var input = CardService.newTextInput()
      .setFieldName('text')
      .setTitle('Email Text')
      .setHint('Please paste your email content.');

  var selector = CardService.newSelectionInput()
      .setType(CardService.SelectionInputType.CHECK_BOX)
      .setTitle("Select which PII you want to search for:")
      .setFieldName("checkbox_field")

  var supportedPii = getSupportedTypes();
  const userProperties = PropertiesService.getUserProperties();
  var userRedactionCounts = {};
  var redactionCountText = "Total redaction counter:\n";

  for (i in supportedPii){
    selector.addItem(supportedPii[i], supportedPii[i]+"_value", false);
    userRedactionCounts[supportedPii[i]] = userProperties.getProperty(supportedPii[i]);
    
    // Never redacted before
    if(userRedactionCounts[supportedPii[i]] === null)
      userRedactionCounts[supportedPii[i]] = 0;
  }

  for (const [type, count] of Object.entries(userRedactionCounts)){
    redactionCountText += type + ": " + parseInt(count) + "\n";
  }

  // Create a button that redacts all sensitive information from email text
  var action = CardService.newAction()
      .setFunctionName('onGmailRedactAll');
  var button = CardService.newTextButton()
      .setText('Find PII')
      .setOnClickAction(action)
      .setTextButtonStyle(CardService.TextButtonStyle.FILLED);
  var buttonSet = CardService.newButtonSet()
      .addButton(button)

  var textParagraph = CardService.newTextParagraph()
    .setText(redactionCountText);

  // Assemble the widgets and return the card.
  var section = CardService.newCardSection()
      .addWidget(input)
      .addWidget(selector)
      .addWidget(buttonSet)
      .addWidget(textParagraph);

  var card = CardService.newCardBuilder()
      .setHeader(header)
      .addSection(section)

  return card.build();
}

/**
 * Callback for redacting an email text.
 * @param {Object} e The event object.
 * @return {CardService.UpdateDraftActionResponse} The draft update response.
 */
function onGmailRedactAll(e) {
  // Load saved user properties
  const userProperties = PropertiesService.getUserProperties();

  // Get the redaction summary from the text of the email
  var redactedSummaryDict = redact(e.formInput.text);

  // Get user redaction counts for each redacted property
  var userRedactionCounts = {};

  for (const [pii, type] of Object.entries(redactedSummaryDict)){
    userRedactionCounts[type] = userProperties.getProperty(type);

    // Never redacted before
    if(userRedactionCounts[type] === null)
      userRedactionCounts[type] = 0;
  }

  var text = "----------------------------------------------------------------------------<br>";

  if (Object.keys(redactedSummaryDict).length === 0)
    text += "SafeSend <b>did NOT find any PII</b> in the email!<br>";
  else {
    text += "SafeSend <b>found the following PII</b> in the email:<ul>";
    for (const [pii, type] of Object.entries(redactedSummaryDict)) {
      userRedactionCounts[type]++;
      text += "<li>" + pii + " : " + type + "</li>";
    }
    text += "</ul>";
  }

  text += "----------------------------------------------------------------------------<br>";

  for (const [type, count] of Object.entries(userRedactionCounts)){
    userProperties.setProperty(type, count);
  }

  var response = CardService.newUpdateDraftActionResponseBuilder()
      .setUpdateDraftBodyAction(CardService.newUpdateDraftBodyAction()
          .addUpdateContent(text,CardService.ContentType.MUTABLE_HTML)
          .setUpdateType(CardService.UpdateDraftBodyType.INSERT_AT_START))
      .build();
  return response;
}