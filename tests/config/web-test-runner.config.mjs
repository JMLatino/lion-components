import { playwrightLauncher } from '@web/test-runner-playwright';

export default {
  nodeResolve: true,
  coverageConfig: {
    report: true,
    reportDir: 'coverage',
    threshold: {
      statements: 90,
      branches: 65,
      functions: 80,
      lines: 90,
    },
  },
  testFramework: {
    config: {
      timeout: '5000',
    },
  },
  browsers: [
    playwrightLauncher({ product: 'firefox', concurrency: 1 }),
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
  files: `tests/test-browser/*.test.js`,
};
