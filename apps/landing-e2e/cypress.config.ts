import { nxE2EPreset } from "@nx/cypress/plugins/cypress-preset";

import { defineConfig } from "cypress";

// import 'dotenv/config'

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: "src",
    }),
    baseUrl: "http://127.0.0.1:4200",
    env: {
      NEXT_PUBLIC_SITE: 'com',
      NEXT_PUBLIC_MODE: 'test',
      NEXT_PUBLIC_URL: '',
      NEXT_PUBLIC_FREELANCER_URL: 'https://dev.freelancer.freelbee.com',
      NEXT_PUBLIC_COMPANY_URL: 'https://dev.company.freelbee.com',
      NEXT_PUBLIC_ADMIN_URL: 'https://dev.admin.freelbee.com',
      NEXT_PUBLIC_EMAIL: 'hello@freelbee.com',
    }
  },
});


// NEXT_PUBLIC_SITE = com
// NEXT_PUBLIC_MODE = test
// NEXT_PUBLIC_URL = /api/v1
// NEXT_PUBLIC_PERSONAL_URL = https://personal.freelbee.com
// NEXT_PUBLIC_EMAIL = hello@freelbee.com
//
// NEXT_PUBLIC_BOT_TOKEN = 6934735186:AAGj--fO5WEIMOLkYoOHxgBqewsBD1Urj1g
// NEXT_PUBLIC_TG_CHANNEL_ID = -1002094989627
