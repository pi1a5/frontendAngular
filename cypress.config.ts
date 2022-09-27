import { defineConfig } from 'cypress'


require('dotenv').config();

export default defineConfig({
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl: 'http://localhost:4200',
  },

  env: {
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.REACT_APP_GOOGLE_CLIENTID,
    googleClientSecret: process.env.REACT_APP_GOOGLE_CLIENT_SECRET
  }
});
