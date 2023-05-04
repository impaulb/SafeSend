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
     *                                 Options: phone, link, email, ip, credit_card, btc_address, ssn
     *
     * Returns:
     * str: The redacted 'data' with PII snippets replaced by '[REDACTED]'.
     */

    const split_data = data.split(' ');

    let pii_summary = {};

    for (const token of split_data)
      if((types = detect(token)) != null)
        pii_summary[token] = types;

    return pii_summary;
  }

// Google Scripts do not work well with automatic
// unit testing. As a result, we had to implement
// unit tests as a simple function. Ugly? Yes.
// But it gets the job done.
function run_test_suite() {
  var valid_ssn = [
    "123-45-6789",
    "544-45-6789",
    "001815293",
    "159-12-9273",
    "252-65-1954",
    "429-89-5729",
    "575 42 8931",
    "575 42-8931",
    "575-42 8931",
    "575 428931",
    "57542-8931"
  ]

  var valid_phone = [
    "555-555-5555",
    "(555) 555 5555",
    "(555)5555555",
    "(555)5555555",
    "555 555 5555",
    "555 555-5555",
    "555-555 5555",
    "(555)-555-5555",
  ]

  var valid_email = [
    "helloworld@gmail.com",
    "anything@outlook.com",
    "student@scu.edu",
    "someone@yahoo.com",
  ]

  console.log("<---- EXECUTING: SSN TEST ---->");

  for(ssn of valid_ssn){
      var response = detect(ssn);

      if(response != 'SSN'){
          console.log("ERROR: " + ssn);
          console.log("\tEXPECT:\tSSN");
          console.log("\tACTUAL:\t" + response);
      }
  }

  console.log("<---- COMPLETED: SSN TEST ---->\n");

  console.log("<---- EXECUTING: PHONE TEST ---->");

  for(phone of valid_phone){
      var response = detect(phone);

      if(response != 'PHONE'){
          console.log("ERROR: " + phone);
          console.log("\tEXPECT:\tPHONE");
          console.log("\tACTUAL:\t" + response);
      }
  }

  console.log("<---- COMPLETED: PHONE TEST ---->\n");

  console.log("<---- EXECUTING: EMAIL TEST ---->");

  for(email of valid_email){
      var response = detect(email);

      if(response != 'EMAIL'){
          console.log("ERROR: " + email);
          console.log("\tEXPECT:\tEMAIL");
          console.log("\tACTUAL:\t" + response);
      }
  }

  console.log("<---- COMPLETED: EMAIL TEST ---->");
}

run_test_suite();