_ssn = new RegExp(/(?!000|666|333)0*(?:[0-6][0-9][0-9]|[0-7][0-6][0-9]|[0-7][0-7][0-2])[- ](?!00)[0-9]{2}[- ](?!0000)[0-9]{4}/);
// _phone = new RegExp()
// _phones_with_exts = new RegExp();
// _link = new RegExp();
// _email = new RegExp();
// _ip = new RegExp();
// _ipv6 = new RegExp();
// _credit_card = new RegExp();
// _btc_address = new RegExp();
// _street_address = new RegExp();
// _zip_code = new RegExp();
// _po_box = new RegExp();

function detect(data) {
    /*
     * Detects personally identifiable information (PII) types in the input 'data' using regular expressions.
     *
     * Returns a dictionary with PII types as keys and corresponding snippets as values.
     */
    return {
    //   'phone': data.match(_phone),
    //   'phones_with_exts': data.match(_phones_with_exts),
    //   'link': data.match(_link),
    //   'email': data.match(_email),
    //   'ip': data.match(_ip),
    //   'ipv6': data.match(_ipv6),
    //   'credit_card': data.match(_credit_card),
    //   'btc_address': data.match(_btc_address),
    //   'street_address': data.match(_street_address),
    //   'zip_code': data.match(_zip_code),
    //   'po_box': data.match(_po_box),
      'ssn': data.match(_ssn)
    };
  }
  
  function redact(data, target = []) {
    /*
     * Redacts personally identifiable information (PII) from the input 'data'.
     *
     * @param data (str): Input data to be redacted.
     * @param target (list, optional): List of PII types to be redacted. Defaults to an empty list which redacts all detected PII.
     *                                 Options: phone, phones_with_exts, link, email, ip, ipv6, credit_card, btc_address, zip_code, po_box, ssn
     *
     * Returns:
     * str: The redacted 'data' with PII snippets replaced by '[REDACTED]'.
     */
  
    const detected = detect(data);
  
    for (const pii_type in detected) {
      if (target.length != 0 && !target.includes(pii_type)) {
        continue;
      }
  
      const pii_data = detected[pii_type];
  
      for (const pii_snippet of pii_data) {
        data = data.replace(pii_snippet, '[REDACTED]');
      }
    }
  
    return data;
  }

let test = redact("My phone number is 387 38 3749");
console.log(test);