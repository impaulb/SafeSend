/**
 * Callback for rendering the card for the compose action dialog.
 * @param {Object} e The event object.
 * @return {CardService.Card} The card to show to the user.
 */
function onGmailCompose(e) {
  // Defining card elements  
  var toField = CardService.newTextInput()
    .setFieldName('toField')
    .setValue('')
    .setTitle('Recipient (To)');
  
  var subjectField = CardService.newTextInput()
    .setFieldName('subjectField')
    .setValue('')
    .setTitle('Subject');

  var bodyField = CardService.newTextInput()
    .setFieldName('bodyField')
    .setValue('')
    .setTitle('Email Body');

  var submitAction = CardService.newAction()
    .setFunctionName('composeSafeEmail');

  var submitButton = CardService.newTextButton()
    .setText('Compose SafeSend Email')
    .setOnClickAction(submitAction)
    .setTextButtonStyle(CardService.TextButtonStyle.FILLED);

  var emailInputSection = CardService.newCardSection()
    .addWidget(toField)
    .addWidget(subjectField)
    .addWidget(bodyField)
    .addWidget(submitButton);

  var cardHeader = CardService.newCardHeader()
    .setTitle('Compose a SafeSend Email')
    .setSubtitle('Enter your email details and let SafeSend securely redact sensitive content.');

  var card = CardService.newCardBuilder()
    .setHeader(cardHeader)
    .addSection(emailInputSection);

  return card.build();
}

/**
 * Callback for redacting an email text.
 * @param {Object} e The event object.
 * @return {CardService.UpdateDraftActionResponse} The draft update response.
 */
function composeSafeEmail(e) {
  // Collect user fields
  var toField = e.formInputs.toField;
  var subjectField = e.formInputs.subjectField;
  var bodyField = e.formInputs.bodyField;

  // Ensure all fields are filled out
  if(e.formInputs.toField == undefined || 
      e.formInputs.subjectField == undefined ||
      e.formInputs.bodyField == undefined)
  {
    return null;
  }

  var user = PropertiesService.getUserProperties()
  var userSettings = user.getProperties();
  const userOverride = JSON.parse(userSettings.override);
  const userSensitivity = JSON.parse(userSettings.sensitivity);
  const keepDigits = userSettings.keepDigits === "true" ? true : false;
  var toRedact = [];

  if(userSensitivity.includes('lowRiskSelect'))
    toRedact.push(...getLowRisk());
  if(userSensitivity.includes('medRiskSelect'))
    toRedact.push(...getMedRisk());
  if(userSensitivity.includes('highRiskSelect'))
    toRedact.push(...getHighRisk());
  
  toRedact.push(...userOverride);

  // Redact personal identifiable information
  subjectField = redactString(subjectField, toRedact, keepDigits);
  bodyField = redactString(bodyField, toRedact, keepDigits);

  // Create updated draft content
  // Needs a catch block if all fields aren't filled out
  var response = CardService.newUpdateDraftActionResponseBuilder()
  .setUpdateDraftToRecipientsAction(CardService.newUpdateDraftToRecipientsAction()
    .addUpdateToRecipients(toField))
  .setUpdateDraftSubjectAction(CardService.newUpdateDraftSubjectAction()
    .addUpdateSubject(subjectField))
  .setUpdateDraftBodyAction(CardService.newUpdateDraftBodyAction()
    .addUpdateContent(bodyField,CardService.ContentType.MUTABLE_HTML)
    .setUpdateType(CardService.UpdateDraftBodyType.INSERT_AT_START))
  .build();

  return response;
}