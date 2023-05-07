const redact = require('./Redact.gs');

// Test 1: Verify that valid SSN numbers are detected correctly.
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
        expect(redact.detect(ssn)).toEqual(expect.arrayContaining(expected));
    });
});

// Test 2: Verify that valid phone numbers are detected correctly.
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
        expect(redact.detect(phone)).toEqual(expect.arrayContaining(expected));
    });
});

// Test 3: Verify that valid email addresses are detected correctly.
test("Verify valid email positive matches", () => {
    const valid_email = [
        "helloworld@gmail.com",
        "anything@outlook.com",
        "student@scu.edu",
        "someone@yahoo.com",
    ];
    const expected = ['EMAIL'];
    
    valid_email.forEach(email => {
        expect(redact.detect(email)).toEqual(expect.arrayContaining(expected));
    });
});

// Test 4: Verify that the list of supported types is up to date.
test("Verify supported types are up to date", () => {
    const expected = ['SSN', 'PHONE', 'EMAIL'];
    expect(redact.getSupportedTypes()).toEqual(expect.arrayContaining(expected));
});

// Test 5: Verify that the Redact function returns an empty dictionary when given an empty string.
test("Verify redact function returns an emtpy dictionary", () => {
    expect(Object.keys(redact.redact("")).length).toEqual(0);
});

// Test 6: Verify that the Redact function returns a dictionary with a single PII snippet and type.
test("Verify redact function returns a dictionary with PII snippets and single type", () => {
    expected = {'(123)456-7890': 'PHONE'}
    expect(redact.redact("Hello world (123)456-7890")).toEqual(expected);
});

// Test 7: Verify that the Redact function returns a dictionary with multiple PII types but a single snippet.
test("Verify redact function returns a dictionary with PII snippets and multiple types", () => {
    expected = {'1234567890': 'SSN,PHONE'}
    expect(redact.redact("Hello world 1234567890")).toEqual(expected);
});

// Test 8: Verify that the Redact function returns a dictionary with multiple PII snippets and types.
test("Verify redact function returns a dictionary with multiple PII snippets", () => {
    expected = {'1234567890': 'SSN,PHONE', 'hello@world.com':'EMAIL'}
    expect(redact.redact("Hello world 1234567890 and my email is hello@world.com")).toEqual(expected);
});

// Test 9: Verify that the Redact function detects only a certain type of PII.
test("Verify redact function returns a dictionary with only the prompted type of PII", () => {
    expected = {'hello@world.com':'EMAIL'}
    expect(redact.redact("Hello world 1234567890 and my email is hello@world.com", ['EMAIL'])).toEqual(expected);
});