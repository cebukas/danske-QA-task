# danske-QA-task

# Project Setup

## Node.js and npm installation
Make sure Node.js and npm are installed on your computer. To verify their installation, execute the commands `node -v` and `npm -v` in the command line. If no version is displayed, visit [Node.js](https://nodejs.org/) to download Node.js and follow the setup instructions.

## Clone the project
Clone the project repository from [https://github.com/cebukas/danske-QA-task](https://github.com/cebukas/danske-QA-task) using the command:
```bash
git clone https://github.com/cebukas/danske-QA-task.git
```
or simply download and extract the zip file from github.

## Open the project in an IDE or navigate via CMD
Open the cloned project through an IDE like VS Code or simply navigate to the project folder through cmd

## Install Cypress
```bash
npm install cypress --save-dev
```

## Run Cypress Test Runner
```bash
npm run cypress:open
```

## Choose a browser and run tests
Cypress test runner GUI should appear. Choose the e2e testing option and then a browser of your choice (for example, Chrome).
Click on the ‘search’ spec and the tests should start running
