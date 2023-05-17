const supportedRegex = {
    'SSN': new RegExp(/\b([0-9]{9})|([0-9]{3}[-,\s][0-9]{6})|([0-9]{5}[-,\s][0-9]{4})|([0-9]{3}[-,\s][0-9]{2}[-,\s][0-9]{4})|([0-9]{2}[-,\s][0-9]{7})/),
    'PHONE': new RegExp(/\b(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/),
    'EMAIL': new RegExp(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi),
    'DATE': new RegExp(/\b(0?[1-9]|1[0-2])[\/. ](0?[1-9]|[12]\d|3[01])[\/. ]((19|20)\d{2}|\d{2})/),
    'VIN': new RegExp(/\b([\S]){17}/),
    'PASSPORT': new RegExp(/\W.\d{1,6}.|\d{9,10}/)
  }
  
  function getTokenTypes(token) {
   /*
    * Detect personally identifiable information (PII) types in a single token.
    *
    * Returns array of the PII types that match token or empty if not PII.
    */
  
    var possible_matches = [];
  
    const supportedTypes = getSupportedTypes();
  
    for(const type of supportedTypes){
      if(token.match(supportedRegex[type]) != null)
        possible_matches.push(type);
    }
  
    return possible_matches;
  }
  
  function isTokenPii(token) {
   /*
    * Detect if a single token contains PII.
    *
    * Returns:
    * bool: true if token is PII, false otherwise
    */
  
    return getTokenTypes(token).length != 0;
  
  }
  
  function getSupportedTypes(){
    /*
      * Retrieve the currently supported PII types.
      *
      * Returns an array of supported types, empty array if none supported.
      */
  
    return Object.keys(supportedRegex);
  }
    
  function redactString(data, target = [], keepLastDigits = false) {
    /*
      * Redacts personally identifiable information (PII) from the input 'data'.
      *
      * @param data (str): Input data to be redacted.
      * @param target (list, optional): List of PII types to be redacted. Defaults to an empty list which redacts all detected PII.
      *                                 Options are provided through the function getSupportedTypes().
      * @param keepLastDigits (bool, optional): Option to keep the last 4 digits of numeric PII in plaintext.
      *                                         This is false by default.
      * 
      * Returns:
      * str: original data string with PII replaced with a [REDACTED] substring.
      */
  
    // Needed since data is not a well defined string
    data = data + '';
    const split_data = data.split(' ');
  
    for (const token of split_data)
      if(isTokenPii(token)){
        var tokenTypes = getTokenTypes(token);
        if(shouldRedact(tokenTypes, target))
            if((tokenTypes.includes('SSN') || tokenTypes.includes('PHONE')) && keepLastDigits)
              data = data.replace(token, 'XXX-' + token.substr(token.length - 4));
            else
              data = data.replace(token, '[REDACTED]');
      }
    return data;
  }

  function shouldRedact(tokenTypes, target){
    /*
      * Check if we should redact the found token type
      *
      * @param tokenTypes (list): PII types associated with a token.
      * @param target (list): List of target PII types to be redacted.
      *
      * Returns:
      * bool: true if the tokenType contains a targeted type
      */
    return (tokenTypes.some(type => target.includes(type)) || target.length === 0)
  }
  
  // Needed for testing, doesn't work in Google Scripts
  module.exports = {
    getTokenTypes,
    getSupportedTypes,
    isTokenPii,
    redactString,
  }