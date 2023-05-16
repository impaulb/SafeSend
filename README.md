# SafeSend

SafeSend is a powerful Gmail plugin designed to enhance email security and protect sensitive information. With SafeSend, you can confidently send emails without worrying about accidental disclosures of confidential data. This plugin provides an extra layer of protection to ensure that sensitive information, such as account numbers, investment details, or proprietary trading information, is redacted from your emails before they are sent.

## Features

- Redact sensitive information: SafeSend's user-friendly interface makes it easy to identify and remove sensitive information from your emails. You can quickly review your emails and confidently redact any data that should not be disclosed to unintended recipients.

- Automated scanning for security vulnerabilities: SafeSend automatically scans your emails for security vulnerabilities and compliance violations, helping you to maintain data privacy policies and comply with legal regulations.

- Time-saving efficiency: SafeSend streamlines your email workflow, allowing you to save time by easily redacting sensitive information in just a few clicks.

- Enhanced professionalism: By using SafeSend, you can maintain the highest standards of professionalism in your email communications, ensuring that sensitive information is protected and not disclosed to unauthorized individuals.

- Easy integration: SafeSend seamlessly integrates with your Gmail account, providing a convenient and efficient solution for securing your email communications.

## Usage

To use SafeSend, simply install the plugin to your Gmail account and follow the user-friendly interface to redact sensitive information from your emails before sending them. SafeSend helps you protect your data privacy, maintain confidentiality, and ensure compliance with legal regulations.

## Running the code

To install SafeSend, you will need to create a Google Cloud account.

### Setting up the environment
1. In the Google Cloud console, go to the Select a project page.
2. Select the Google Cloud project you want to use. Or, click Create project and follow the on-screen instructions. If you create a Google Cloud project, you might need to turn on billing for the project.

### Configuring OAuth
3. In the Google Cloud console, go to Menu > APIs & Services > OAuth consent screen.
4. Select the user type for your app, then click Create.
5. Complete the app registration form, then click Save and Continue.
6. For now, you can skip adding scopes and click Save and Continue. In the future, when you create an app for use outside of your Google Workspace organization, you must add and verify the authorization scopes that your app requires.

### Setting up the SafeSend script
7. To create a new Apps Script project, go to script.new
8. Click Untitled project.
9. Rename the Apps Script project 'SafeSend' and click Rename.
11. Click Add a file > Script. Name the file Gmail.
12. Click Add a file > Script. Name the file Redact.
13. Replace file contents of both files with the ones from SafeSend/src directory.
14. Click Project Settings.
15. Check the Show "appsscript.json" manifest file in editor box.
16. Click Editor.
17. Open the appsscript.json file and replace with the one from SafeSend/src directory.

## Testing the code

The code can be tested locally using Node.

1. Clone the code to a directory.
2. Open the src folder
3. Run 'npm install'
4. Run 'npm test'

## Contributing

We welcome contributions to SafeSend! If you would like to contribute, please fork the repository, make your changes, and submit a pull request. We appreciate your help in making SafeSend even better!

## License

SafeSend is released under the [MIT License](https://opensource.org/license/mit/), which means it is free and open-source software that can be used, modified, and distributed with attribution.