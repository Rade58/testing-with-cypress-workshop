import { defineConfig } from 'cypress';

import reset from './prisma/reset.cjs';
import seed from './prisma/seed.cjs';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        reset() {
          reset();
          return null;
        },
        seed() {
          seed();
          return null;
        }
      });
    }
  },
  projectId: '1y2pk7'
});
