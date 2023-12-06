const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    baseUrl: 'https://job.danskebank.lt/',
    pageLoadTimeout: 10000,
    viewportWidth: 1440,
    viewportHeight: 900
  },
});
