module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/*.(test|spec).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapping: {
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@components/(.*)$': '<rootDir>/src/shared/components/$1',
    '^@services/(.*)$': '<rootDir>/src/shared/services/$1',
    '^@models/(.*)$': '<rootDir>/src/shared/models/$1',
    '^@utils/(.*)$': '<rootDir>/src/shared/utils/$1',
    '^@hooks/(.*)$': '<rootDir>/src/shared/hooks/$1',
    '^@constants/(.*)$': '<rootDir>/src/shared/constants/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/index.ts'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  testTimeout: 10000
};
