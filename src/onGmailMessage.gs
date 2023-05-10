/**
 * Returns the contextual add-on data that should be rendered for
 * the current e-mail thread. This function satisfies the requirements of
 * an 'onTriggerFunction' and is specified in the add-on's manifest.
 *
 * @param {Object} event Event containing the message ID and other context.
 * @returns {Card[]}
 */

function onGmailMessage(e) {
    var header = CardService.newCardHeader()
          .setTitle('Check Email')
          .setSubtitle('Press the button to find all sensitive information in your email text.');
  
    var action = CardService.newAction()
          .setFunctionName('onGmailFindAll');
  
    //button to find PII of current Gmail message
    var button = CardService.newTextButton()
          .setText('Find PII')
          .setOnClickAction(action)
          .setTextButtonStyle(CardService.TextButtonStyle.FILLED);
  
  
    return card.build();
  }
  
  /**
   * Function returns a body of all PII found in the current Gmail message
   */
  
  function onGmailFindAll(e) {
    // Load saved user properties
    const userProperties = PropertiesService.getUserProperties();
  
    // Get the detection summary from the text of the email
    var redactedSummaryDict = detect(e.formInput.text);
    
    // Get user redaction counts for each redacted property
    var userRedactionCounts = {};
  
  }
  
  /*function getContextualAddOn(event) {
    var card = CardService.newCardBuilder();
    card.setHeader(CardService.newCardHeader().setTitle('Log Your Expense'));
  
    var section = CardService.newCardSection();
    section.addWidget(CardService.newTextInput()
      .setFieldName('Date')
      .setTitle('Date'));
    section.addWidget(CardService.newTextInput()
      .setFieldName('Amount')
      .setTitle('Amount'));
    section.addWidget(CardService.newTextInput()
      .setFieldName('Description')
      .setTitle('Description'));
    section.addWidget(CardService.newTextInput()
      .setFieldName('Spreadsheet URL')
      .setTitle('Spreadsheet URL'));
  
    card.addSection(section);
  
    return [card.build()];
  }*/