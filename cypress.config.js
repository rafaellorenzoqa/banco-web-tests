const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    expose: {
      URL: 'http://localhost:4000',
    },
    env: {

    },

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
