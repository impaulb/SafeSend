const helper = require('./Helper.gs');

// Test: Verify that valid SSN numbers are detected correctly.
test("Verify valid SSN positive matches", () => {
    const valid_ssn = [
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
    ];
    const expected = ['SSN'];
    
    valid_ssn.forEach(ssn => {
        expect(helper.getTokenTypes(ssn)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that valid phone numbers are detected correctly.
test("Verify valid phone positive matches", () => {
    const valid_phone = [
        "555-555-5555",
        "(555) 555 5555",
        "(555)5555555",
        "(555)5555555",
        "555 555 5555",
        "555 555-5555",
        "555-555 5555",
        "(555)-555-5555",
    ];
    const expected = ['PHONE'];
    
    valid_phone.forEach(phone => {
        expect(helper.getTokenTypes(phone)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that valid dates are detected correctly.
test("Verify valid dates positive matches", () => {
    const valid_date = [
        "1/1/2002",
        "01/01/2002",
        "1.1.2002",
        "01.01.2002",
        "1 1 2002",
        "01 01 2002",
        "01/01 2002",
        "1/1/02",
        "01/01/02"
    ];
    const expected = ['DATE'];
    
    valid_date.forEach(date => {
        expect(helper.getTokenTypes(date)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that valid email addresses are detected correctly.
test("Verify valid email positive matches", () => {
    const valid_email = [
        "helloworld@gmail.com",
        "anything@outlook.com",
        "student@scu.edu",
        "someone@yahoo.com",
    ];
    const expected = ['EMAIL'];
    
    valid_email.forEach(email => {
        expect(helper.getTokenTypes(email)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that valid VINs are detected correctly.
test("Verify valid VIN positive matches", () => {
    const valid_vin = [
        "4S3BK4358V7310025",
        "JH4KA2650HC000268",
        "1FMZK04185GA30815",
        "3D7KU28C04G254161",
        "WBAVB13506PT22180"
    ];
    const expected = ['VIN'];
    
    valid_vin.forEach(vin => {
        expect(helper.getTokenTypes(vin)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that valid Passport numbers are detected correctly.
test("Verify valid Passport number", ()=>{
    const valid_passport = [
        "948331512",
        "850642111",
        "130125111",
        "116794678",
        "504918825"
    ];
    const expected = ['PASSPORT'];

    valid_passport.forEach(passport => {
        expect(helper.getTokenTypes(passport)).toEqual(expect.arrayContaining(expected));
      
// Test: Verify that valid MAC addresses are detected correctly.
test("Verify valid MAC address positive matches", () => {
    const valid_mac = [
        "4E-12-42-D2-58-CE",
        "58:0D:32:E6:52:8D",
        "12C5.8A53.8DA4",
        "69-69-65-e4-14-e6",
        "a4:6d:33:49:5b:c6",
        "d566.0cbe.d6d4"
    ];
    const expected = ['MAC_ADDR'];
    
    valid_mac.forEach(mac => {
        expect(helper.getTokenTypes(mac)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that keywords are identified in data
test("Verify that keywords are identified in data", () => {
    const strings = [
        "name address phone number social security number SSN date of birth email address passport license bank account credit card national identification tax identification medical record username password maiden name pin biometric ip mac coordinates employment history education history transactions"
    ];
    
    strings.forEach(str => {
        expect(helper.checkForKeywords(str).length).toEqual(25);
    });
});


// Test: Verify that the list of supported types is up to date.
test("Verify supported types are up to date", () => {
    const expected = ['SSN', 'PHONE', 'EMAIL', 'DATE', 'VIN', 'MAC_ADDR'];
    expect(helper.getSupportedTypes()).toEqual(expect.arrayContaining(expected));
    expect(helper.getSupportedTypes().length).toEqual(expected.length);
});

// Test: Verify that the Redact function returns an empty string when given an empty string.
test("Verify redact function returns an empty dictionary", () => {
    expect(helper.redactString("").length).toEqual(0);
});

// Test: Verify that the Redact function returns a redacted string with a single PII snippet.
test("Verify redact function returns a dictionary with PII snippets and single type", () => {
    var expected = "Hello world [REDACTED]";
    expect(helper.redactString("Hello world (123)456-7890")).toEqual(expected);
});

// Test: Verify that the Redact function returns a redacted string with multiple PII types but a single snippet.
test("Verify redact function returns a dictionary with PII snippets and multiple types", () => {
    var expected = "Hello world [REDACTED]";
    expect(helper.redactString("Hello world 1234567890")).toEqual(expected);
});

// Test: Verify that the Redact function returns a dictionary with multiple PII snippets and types.
test("Verify redact function returns a dictionary with multiple PII snippets", () => {
    var expected = "Hello world [REDACTED] and my email is [REDACTED]";
    expect(helper.redactString("Hello world 1234567890 and my email is hello@world.com")).toEqual(expected);
});

// Test: Verify that the Redact function detects only a certain type of PII.
test("Verify redact function returns a dictionary with only the prompted type of PII", () => {
    var expected = "Hello world 1234567890 and my email is [REDACTED]";
    expect(helper.redactString("Hello world 1234567890 and my email is hello@world.com", ['EMAIL'])).toEqual(expected);
});

// Test: Verify that the Redact function can keep the last 4 digits of SSN in plaintext.
test("Verify redact function returns a dictionary with only the prompted type of PII", () => {
    var expected = "Hello world XXX-6789";
    expect(helper.redactString("Hello world 123-45-6789", ['SSN'], keepLastDigits = true)).toEqual(expected);
});

// Test: Verify that the Redact function can keep the last 4 digits of phone in plaintext.
test("Verify redact function returns a dictionary with only the prompted type of PII", () => {
    var expected = "Hello world XXX-7890";
    expect(helper.redactString("Hello world 123-456-7890", ['PHONE'], keepLastDigits = true)).toEqual(expected);
});