/**
 * Callback for rendering the card for the common sidebar.
 * @param {Object} e The event object.
 * @return {CardService.Card} The card to show to the user.
 */
function onHomepage(e) {
    var user = PropertiesService.getUserProperties()
    var userSettings = user.getProperties();
  
    // User logging in the first time
    if(userSettings.doWarn === null || userSettings.doRedact === null){
      user.setProperty('doWarn') = true;
      user.setProperty('doRedact') = false;
      user.setProperty('lowRiskToggle') = false;
      user.setProperty('medRiskToggle') = false;
      user.setProperty('highRiskToggle') = true;
    }
  
    var cardHeader = CardService.newCardHeader()
      .setTitle('Preferences')
      .setSubtitle('Select your preferred settings.');
  
    var safeSendActionSelection = CardService.newSelectionInput()
      .setType(CardService.SelectionInputType.RADIO_BUTTON)
      .setFieldName("safeSendAction")
      .addItem("Warn", "doWarn", userSettings.doWarn === "true" ? true : false)
      .addItem("Redact", "doRedact", userSettings.doRedact === "true" ? true : false);
  
    var sensitivitySelection = CardService.newSelectionInput()
      .setType(CardService.SelectionInputType.CHECK_BOX)
      .setFieldName("sensitivitySelection")
      .addItem("High Risk", "highRiskSelect", userSettings.highRiskSelect === "true" ? true : false)
      .addItem("Medium Risk", "medRiskSelect", userSettings.medRiskSelect === "true" ? true : false)
      .addItem("Low Risk", "lowRiskSelect", userSettings.lowRiskSelect === "true" ? true : false);
  
    var redactionSection = CardService.newCardSection()
      .addWidget(CardService.newTextParagraph().setText("<b>SafeSend Action</b>"))
      .addWidget(CardService.newTextParagraph().setText("<i>Choose how SafeSend should act when PII is detected.</i>"))
      .addWidget(safeSendActionSelection);
  
    var sensitivitySection = CardService.newCardSection()
      .addWidget(CardService.newTextParagraph().setText("<b>Sensitivity</b>"))
      .addWidget(CardService.newTextParagraph().setText("<i>Choose the sensitivity of information that should be detected.</i>"))
      .addWidget(sensitivitySelection);
  
    var overrideSelection = CardService.newSelectionInput()
      .setType(CardService.SelectionInputType.CHECK_BOX)
      .setFieldName("overrideSelection")
      .addItem("SSN", "overrideSSN", userSettings.overrideSSN === "true" ? true : false)
      .addItem("PHONE", "overridePHONE", userSettings.overridePHONE === "true" ? true : false)
      .addItem("EMAIL", "overrideEMAIL", userSettings.overrideEMAIL === "true" ? true : false)
      .addItem("DATE", "overrideDATE", userSettings.overrideDATE === "true" ? true : false)
      .addItem("VIN", "overrideVIN", userSettings.overrideVIN === "true" ? true : false)
      .addItem("PASSPORT", "overridePASSPORT", userSettings.overridePASSPORT === "true" ? true : false)
      .addItem("MAC_ADDR", "overrideMAC_ADDR", userSettings.overrideMAC_ADDR === "true" ? true : false)
  
    var advancedSelection = CardService.newSelectionInput()
      .setType(CardService.SelectionInputType.CHECK_BOX)
      .setFieldName("advancedSelection")
      .addItem("Keep last 4 digits of numbers", "keepDigits", userSettings.keepDigits === "true" ? true : false)
    
    var collapsedSection = CardService.newCardSection()
      .addWidget(CardService.newTextParagraph().setText("<b>Overrides</b>"))
      .addWidget(CardService.newTextParagraph().setText("<i>Override the sensitivity to include specific PII.</i>"))
      .addWidget(overrideSelection)
      .addWidget(CardService.newTextParagraph().setText("<b>Advanced Options</b>"))
      .addWidget(CardService.newTextParagraph().setText("<i>Set more advanced options to customize your SafeSend experience.</i>"))
      .addWidget(advancedSelection)
      .setCollapsible(true);
  
    var submitAction = CardService.newAction()
      .setFunctionName('saveSettings');
  
    var submitSection = CardService.newCardSection()
      .addWidget(CardService.newTextButton()
        .setText('Save Settings')
        .setOnClickAction(submitAction)
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED)).setCollapsible(false);
  
    var card = CardService.newCardBuilder()
      .setHeader(cardHeader)
      .addSection(redactionSection)
      .addSection(sensitivitySection)
      .addSection(collapsedSection)
      .addSection(submitSection);
  
    return card.build();
  }
  
  function saveSettings(e) {
    if(e.formInputs.sensitivitySelection === undefined)
      e.formInputs.sensitivitySelection = [];
    
    if(e.formInputs.overrideSelection === undefined)
      e.formInputs.overrideSelection = [];
  
    if(e.formInputs.advancedSelection === undefined)
      e.formInputs.advancedSelection = [];
  
    const newSettings = {
      'doWarn': e.formInputs.safeSendAction.includes("doWarn"),
      'doRedact': e.formInputs.safeSendAction.includes("doRedact"),
      'lowRiskSelect': e.formInputs.sensitivitySelection.includes('lowRiskSelect'),
      'medRiskSelect': e.formInputs.sensitivitySelection.includes('medRiskSelect'),
      'highRiskSelect': e.formInputs.sensitivitySelection.includes('highRiskSelect'),
      'overrideSSN': e.formInputs.overrideSelection.includes('overrideSSN'),
      'overridePHONE': e.formInputs.overrideSelection.includes('overridePHONE'),
      'overrideEMAIL': e.formInputs.overrideSelection.includes('overrideEMAIL'),
      'overrideDATE': e.formInputs.overrideSelection.includes('overrideDATE'),
      'overrideVIN': e.formInputs.overrideSelection.includes('overrideVIN'),
      'overridePASSPORT': e.formInputs.overrideSelection.includes('overridePASSPORT'),
      'overrideMAC_ADDR': e.formInputs.overrideSelection.includes('overrideMAC_ADDR'),
      'keepDigits': e.formInputs.advancedSelection.includes('keepDigits')
    }
  
    const user = PropertiesService.getUserProperties();
    user.setProperties(newSettings);
  }