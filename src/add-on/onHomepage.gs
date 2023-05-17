/**
 * Callback for rendering the card for the common sidebar.
 * @param {Object} e The event object.
 * @return {CardService.Card} The card to show to the user.
 */
function onHomepage(e) {
    var header = CardService.newCardHeader()
        .setTitle('Preferences')
        .setSubtitle('Select your default settings.');

var checkbox = CardService.newSelectionInput()
    .setType(CardService.SelectionInputType.CHECK_BOX)   //TODO: Allow only one to be checked at a time
    .setFieldName("checkbox_field")
    .addItem("Warn", "checkbox_one_value", true)
    .addItem("Redact", "checkbox_two_value", false);

  var lowRiskToggle  = CardService.newDecoratedText()
  .setTopLabel("Low Risk PII")
  .setText("Low Risk")
  .setWrapText(true)
  .setSwitchControl(CardService.newSwitch()
      .setFieldName("form_input_switch_key")
      .setValue("form_input_switch_value")
      .setOnChangeAction(CardService.newAction()
          .setFunctionName("handleSwitchChange")));

  var mediumRiskToggle  = CardService.newDecoratedText()
  .setTopLabel("Medium Risk PII")
  .setText("Medium Risk")
  .setWrapText(true)
  .setSwitchControl(CardService.newSwitch()
      .setFieldName("form_input_switch_key")
      .setValue("form_input_switch_value")
      .setOnChangeAction(CardService.newAction()
          .setFunctionName("handleSwitchChange")));

  var highRiskToggle  = CardService.newDecoratedText()
  .setTopLabel("High Risk PII")
  .setText("High Risk")
  .setWrapText(true)
  .setSwitchControl(CardService.newSwitch()
      .setFieldName("form_input_switch_key")
      .setValue("form_input_switch_value")
      .setOnChangeAction(CardService.newAction()
          .setFunctionName("handleSwitchChange")));

  var redactionSection = CardService.newCardSection()
    .addWidget(CardService.newDecoratedText().setText("Redaction Action"))
    .addWidget(CardService.newTextParagraph().setText("Set default to warn or redact."))
    .addWidget(checkbox);

  var sensitivitySection = CardService.newCardSection()
    .addWidget(CardService.newDecoratedText().setText("Sensitivity"))
    .addWidget(CardService.newTextParagraph().setText("Select low, medium or high risk PII to warn/redact."))
    .addWidget(lowRiskToggle)
    .addWidget(mediumRiskToggle)
    .addWidget(highRiskToggle);
    
  var overrideSection = CardService.newCardSection()
    .addWidget(CardService.newDecoratedText().setText("Overrides"))
    .addWidget(CardService.newTextParagraph().setText("Override the sensitivity to include specific PII."));
  
  var specialSection = CardService.newCardSection()
    .addWidget(CardService.newDecoratedText().setText("Special Options"))
    .setCollapsible(true);

    var card = CardService.newCardBuilder()
        .setHeader(header)
        .addSection(redactionSection)
        .addSection(sensitivitySection)
        .addSection(overrideSection)
        .addSection(specialSection);

    return card.build();
}

function saveSettings(e) {
  return null;
}