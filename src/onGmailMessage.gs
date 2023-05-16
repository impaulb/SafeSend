/**
 * Returns the contextual add-on data that should be rendered for
 * the current e-mail thread. This function satisfies the requirements of
 * an 'onTriggerFunction' and is specified in the add-on's manifest.
 *
 * @param {Object} event Event containing the message ID and other context.
 * @returns {Card[]}
 */

function onGmailMessage(e) {
  //define main card elements
  var header = CardService.newCardHeader()
        .setTitle('Check Email')
        .setSubtitle('Press the button to find all sensitive information in your email text.');

  var action = CardService.newAction()
        .setFunctionName('onGmailFindAll');

  var submitButton = CardService.newTextButton()
    .setText('Find PII')
    .setOnClickAction(action)
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED);

  var buttonSection = CardService.newCardSection()
    .addWidget(submitButton);

  var card = CardService.newCardBuilder()
    .setHeader(header)
    .addSection(buttonSection);

  return card.build();
}

/**
 * Function returns a body of all PII found in the current Gmail message and the count
 */

function onGmailFindAll(e) {
  var header = CardService.newCardHeader()
        .setTitle('Result')
        .setSubtitle('Press the button to see the current message redacted.')

  // Get the Gmail message text
  var message = getCurrentMessage(e).getBody();

  // Get the detection summary from the text of the email
  var redactedSummaryDict = redactString(message);
  var userRedactionCounts = getRedactionCount(redactedSummaryDict);
  

  var action = CardService.newAction()
      .setFunctionName('redactedSummary');

  var redactSummaryButton = CardService.newTextButton()
    .setText('Redacted Summary')
    .setOnClickAction(action)
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED);

  var outputSection = CardService.newCardSection()
    .addWidget(CardService.newTextParagraph()
      .setText("Redaction count: " + userRedactionCounts))
    .addWidget(redactSummaryButton);


  var outputCard = CardService.newCardBuilder()
    .setHeader(header)
    .addSection(outputSection);

  return outputCard.build();

}

/**
 * Creates a card with the redacted current message.
 * @param {Event} event Action event object
 * @return {Card}
 */
function redactedSummary(e) {

  // get redacted string
  var message = redactString(getCurrentMessage(e).getBody());

  //create card header and section
  var header = CardService.newCardHeader()
        .setTitle('Redacted Summary');

  var redactedSection = CardService.newCardSection()
    .addWidget(CardService.newTextParagraph()
      .setText(message));

  var summaryCard = CardService.newCardBuilder()
    .setHeader(header)
    .addSection(redactedSection);

  return summaryCard.build();
}

/**
 * Retrieves the current message given an action event object.
 * @param {Event} event Action event object
 * @return {Message}
 */
function getCurrentMessage(e) {
  var accessToken = e.messageMetadata.accessToken;
  var messageId = e.messageMetadata.messageId;
  GmailApp.setCurrentMessageAccessToken(accessToken);
  return GmailApp.getMessageById(messageId);
}

/**
 * Returns the redaction count given a message.
 * @param {Message} string message
 * @return {Count} redaction count
 */
function getRedactionCount(message) {
  var messageArray = message.split(" ");
  var count = 0;
  for (var i = 0; i < messageArray.length; i++) {
    if (messageArray[i] == "[REDACTED]")
      count++;
  }
  return parseInt(count).toFixed(0);
}

