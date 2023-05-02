_ssn = new RegExp(/^(?!000|666|333)0*(?:[0-6][0-9][0-9]|[0-7][0-6][0-9]|[0-7][0-7][0-2])[- ](?!00)[0-9]{2}[- ](?!0000)[0-9]{4}/);

function detect(data) {
    /*
     * Detects personally identifiable information (PII) types in the input 'data' using regular expressions.
     *
     * Returns a string of the PII type or null if not PII.
     */

    if(data.match(_ssn) != null)
      return "SSN";
    else
      return null;
  }

  function getSupportedTypes(){
    return ['SSN', 'PHONE'];
  }
  
  function redact(data, target = []) {
    /*
     * Redacts personally identifiable information (PII) from the input 'data'.
     *
     * @param data (str): Input data to be redacted.
     * @param target (list, optional): List of PII types to be redacted. Defaults to an empty list which redacts all detected PII.
     *                                 Options: phone, link, email, ip, credit_card, btc_address, ssn
     *
     * Returns:
     * str: The redacted 'data' with PII snippets replaced by '[REDACTED]'.
     */

    const split_data = data.split(' ');

    let pii_summary = {};

    for (const token of split_data)
      if((type = detect(token)) != null)
        pii_summary[token] = type;

    return pii_summary;
  }