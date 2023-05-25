const helper = require('./Helper.gs');

// Test: Verify that valid SSN numbers are detected correctly.
test("Verify valid SSN positive matches", () => {
    // Arrange
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
    
    // Act
    valid_ssn.forEach(ssn => {
    
    // Assert
        expect(helper.getTokenTypes(ssn)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that valid phone numbers are detected correctly.
test("Verify valid phone positive matches", () => {
    // Arrange
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
    
    // Act
    valid_phone.forEach(phone => {

    // Assert
        expect(helper.getTokenTypes(phone)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that valid dates are detected correctly.
test("Verify valid dates positive matches", () => {
    // Arrange
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
    
    // Act
    valid_date.forEach(date => {
    
    // Assert
        expect(helper.getTokenTypes(date)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that valid email addresses are detected correctly.
test("Verify valid email positive matches", () => {
    // Arrange
    const valid_email = [
        "helloworld@gmail.com",
        "anything@outlook.com",
        "student@scu.edu",
        "someone@yahoo.com",
    ];

    const expected = ['EMAIL'];
    
    // Act
    valid_email.forEach(email => {

    // Assert
        expect(helper.getTokenTypes(email)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that valid VINs are detected correctly.
test("Verify valid VIN positive matches", () => {
    // Arrange
    const valid_vin = [
        "4S3BK4358V7310025",
        "JH4KA2650HC000268",
        "1FMZK04185GA30815",
        "3D7KU28C04G254161",
        "WBAVB13506PT22180"
    ];

    const expected = ['VIN'];
    
    // Act
    valid_vin.forEach(vin => {

    // Assert
        expect(helper.getTokenTypes(vin)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that valid Passport numbers are detected correctly.
test("Verify valid Passport number", ()=>{
    // Arrange
    const valid_passport = [
        "948331512",
        "850642111",
        "130125111",
        "116794678",
        "504918825"
    ];

    const expected = ['PASSPORT'];

    // Act
    valid_passport.forEach(passport => {
    
    // Assert
        expect(helper.getTokenTypes(passport)).toEqual(expect.arrayContaining(expected));
    });
});
      
// Test: Verify that valid MAC addresses are detected correctly.
test("Verify valid MAC address positive matches", () => {
    // Arrange
    const valid_mac = [
        "4E-12-42-D2-58-CE",
        "58:0D:32:E6:52:8D",
        "12C5.8A53.8DA4",
        "69-69-65-e4-14-e6",
        "a4:6d:33:49:5b:c6",
        "d566.0cbe.d6d4"
    ];

    const expected = ['MAC_ADDR'];
    
    // Act
    valid_mac.forEach(mac => {
    
    // Assert
        expect(helper.getTokenTypes(mac)).toEqual(expect.arrayContaining(expected));
    });
});

// Test: Verify that keywords are identified in data
test("Verify that keywords are identified in data", () => {
    // Arrange
    const strings = [
        "name address phone number social security number SSN date of birth email address passport license bank account credit card national identification tax identification medical record username password maiden name pin biometric ip mac coordinates employment history education history transactions"
    ];

    const expected = 25;
    
    // Act
    strings.forEach(str => {
    
    // Assert
        expect(helper.checkForKeywords(str).length).toEqual(expected);
    });
});


// Test: Verify that the list of supported types is up to date.
test("Verify supported types are up to date", () => {
    // Arrange
    const expected = ['SSN', 'PHONE', 'EMAIL', 'DATE', 'VIN', 'PASSPORT', 'MAC_ADDR'];

    // Act
    const actual = helper.getSupportedTypes();

    // Assert
    expect(actual).toEqual(expect.arrayContaining(expected));
    expect(actual.length).toEqual(expected.length);
});

// Test: Verify that the Redact function returns an empty string when given an empty string.
test("Verify redact function returns an empty dictionary", () => {
    // Arrange
    const request = "";
    const expected = 0;

    // Act
    const actual = helper.redactString(request).length;

    // Assert
    expect(actual).toEqual(expected);
});

// Test: Verify that the Redact function returns a redacted string with a single PII snippet.
test("Verify redact function returns a dictionary with PII snippets and single type", () => {
    // Arrange
    const request = "Hello world (123)456-7890";
    const expected = "Hello world [REDACTED]";

    // Act
    const actual = helper.redactString(request);

    // Assert
    expect(actual).toEqual(expected);
});

// Test: Verify that the Redact function returns a redacted string with multiple PII types but a single snippet.
test("Verify redact function returns a dictionary with PII snippets and multiple types", () => {
    // Arrange
    const request = "Hello world 1234567890";
    const expected = "Hello world [REDACTED]";

    // Act
    const actual = helper.redactString(request);

    // Assert
    expect(actual).toEqual(expected);
});

// Test: Verify that the Redact function returns a dictionary with multiple PII snippets and types.
test("Verify redact function returns a dictionary with multiple PII snippets", () => {
    // Arrange
    const request = "Hello world 1234567890 and my email is hello@world.com"
    const expected = "Hello world [REDACTED] and my email is [REDACTED]";

    // Act
    const actual = helper.redactString(request);

    // Assert
    expect(actual).toEqual(expected);
});

// Test: Verify that the Redact function detects only a certain type of PII.
test("Verify redact function returns a dictionary with only the prompted type of PII", () => {
    // Arrange
    const request = "Hello world 1234567890 and my email is hello@world.com";
    const expected = "Hello world 1234567890 and my email is [REDACTED]";

    // Act
    const actual = helper.redactString(request, ['EMAIL']);

    // Assert
    expect(actual).toEqual(expected);
});

// Test: Verify that the Redact function can keep the last 4 digits of SSN in plaintext.
test("Verify redact function returns a dictionary with only the prompted type of PII", () => {
    // Arrange
    const request = "Hello world 123-45-6789";
    const expected = "Hello world XXX-6789";

    // Act
    const actual = helper.redactString(request, ['SSN'], keepLastDigits = true);

    // Assert
    expect(actual).toEqual(expected);
});

// Test: Verify that the Redact function can keep the last 4 digits of phone in plaintext.
test("Verify redact function returns a dictionary with only the prompted type of PII", () => {
    // Arrange
    const request = "Hello world 123-456-7890";
    const expected = "Hello world XXX-7890";
    
    // Act
    const actual = helper.redactString(request, ['PHONE'], keepLastDigits = true);

    // Assert
    expect(actual).toEqual(expected);
});

// Test: Verify a basic name keyword match
test("Verify a basic name keyword match", () => {
    // Arrange
    const request = "Hello there, my name is Paul";
    const expected = ['name'];
    
    // Act
    const actual = helper.checkForKeywords(request);

    // Assert
    expect(actual).toEqual(expected);
});

// Test: Verify multiple keyword match
test("Verify multiple keyword match", () => {
    // Arrange
    const request = "Hello there, my name is Paul and my credit card number is blah.";
    const expected = ['name', 'credit card'];
    
    // Act
    const actual = helper.checkForKeywords(request);

    // Assert
    expect(actual).toEqual(expected);
});

// Test: Verify no keyword match
test("Verify no keyword match", () => {
    // Arrange
    const request = "Hello there, the weather is nice";
    const expected = [];
    
    // Act
    const actual = helper.checkForKeywords(request);

    // Assert
    expect(actual).toEqual(expected);
});

// Test: Verify keyword match after redaction
test("Verify keyword match after redaction", () => {
    // Arrange
    const request = "Hello there, my phone number is 4256334559";
    const expected_kw = ['phone number'];
    const expected_redact = "Hello there, my phone number is [REDACTED]"
    
    // Act
    const actual_redact = helper.redactString(request);
    const actual_kw = helper.checkForKeywords(actual_redact);

    // Assert
    expect(actual_redact).toEqual(expected_redact);
    expect(actual_kw).toEqual(actual_kw);
});

// Test: verify warnString with both subject and body
test("Verify warnString works as expected", () => {
    //arrange
    const body = "Hello, my name is Luke. My phone number is 425-555-5555";
    const subject = "SSN: 444-44-4444"
    const expectedWarn = subject + body + "\t Check for the following information that was detected: " + "444-44-4444" + "425-555-5555";
    //act
    const actualWarn = helper.warnString(body, subject);
    //assert
    expect(expectedWarn).toEqual(actualWarn);
});