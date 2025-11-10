import { defineConfig } from 'cypress'
export default defineConfig({e2e:{baseUrl:'http://localhost:8080',viewportWidth:1200,viewportHeight:800,supportFile:'cypress/support/e2e.js'},video:false})
