_ssn = new RegExp(/([0-9]{9})|([0-9]{3}[-,\s][0-9]{6})|([0-9]{5}[-,\s][0-9]{4})|([0-9]{3}[-,\s][0-9]{2}[-,\s][0-9]{4})|([0-9]{2}[-,\s][0-9]{7})/);
_phone = new RegExp(/(?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})/);
_email = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);

function detect(data) {
    /*
     * Detects personally identifiable information (PII) types in the input 'data' using regular expressions.
     *
     * Returns a string of the PII type or null if not PII.
     */

  var possible_matches = [];
    if(data.match(_ssn) != null)
      possible_matches.push("SSN");
    if(data.match(_phone) != null)
      possible_matches.push("PHONE");
    if(data.match(_email) != null)
      possible_matches.push("EMAIL");
    
    if(possible_matches.length === 0)
      return null;

    return possible_matches;
  }

  function getSupportedTypes(){
    return ['SSN', 'PHONE', 'EMAIL'];
  }
  
  function redact(data, target = []) {
    /*
     * Redacts personally identifiable information (PII) from the input 'data'.
     *
     * @param data (str): Input data to be redacted.
     * @param target (list, optional): List of PII types to be redacted. Defaults to an empty list which redacts all detected PII.
     *                                 Options are provided through the function getSupportedTypes()
     *
     * Returns:
     * dict: Key: token that was matches, Value: array of possible PII types that matched
     */

    const split_data = data.split(' ');

    let pii_summary = {};

    for (const token of split_data)
      if((types = detect(token)) != null)
        if(target.length === 0 || target.some(type => types.includes(type)))
          pii_summary[token] = types.toString();

    return pii_summary;
  }

module.exports = {
  detect,
  getSupportedTypes,
  redact,
}