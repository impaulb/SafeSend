_ssn = new RegExp(/^(?!000|666|333)0*(?:[0-6][0-9][0-9]|[0-7][0-6][0-9]|[0-7][0-7][0-2])[- ](?!00)[0-9]{2}[- ](?!0000)[0-9]{4}/);
_phone = new RegExp(/^(?:\+?(\d{1,3}))?([-.(]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)/gm)
_link = new RegExp(/^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi);
_email = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g);
_ip = new RegExp(/^(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/ig);
_credit_card = new RegExp(/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})/);
_btc_address = new RegExp(/^([13][a-km-zA-HJ-NP-Z0-9]{26,33})/g);

function detect(data) {
    /*
     * Detects personally identifiable information (PII) types in the input 'data' using regular expressions.
     *
     * Returns a string of the PII type or null if not PII.
     */

    if(data.match(_phone) != null)
      return "phone";
    else if(data.match(_link) != null)
      return "link";
    else if(data.match(_email) != null)
      return "email";
    else if(data.match(_ip) != null)
      return "ip";
    else if(data.match(_credit_card) != null)
      return "credit_card";
    else if(data.match(_btc_address) != null)
      return "btc_address";
    else if(data.match(_ssn) != null)
      return "ssn";
    else
      return null;
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

    for (const pii_snippet in pii_summary)
      data = data.replace(pii_snippet, '[REDACTED]');

    return data;
  }