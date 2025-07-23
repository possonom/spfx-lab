import '@testing-library/jest-dom';

// Mock SharePoint context
global.window = Object.create(window);
Object.defineProperty(window, 'location', {
  value: {
    href: 'https://tenant.sharepoint.com/sites/test'
  }
});

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn()
};
