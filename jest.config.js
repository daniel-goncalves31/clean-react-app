module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}'
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  },
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts, tsx)$': 'ts-jest'
  }
}
