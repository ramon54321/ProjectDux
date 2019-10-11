module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    "@common(.*)$": "<rootDir>/src/common$1",
    "@api(.*)$": "<rootDir>/src/services/api$1",
    "@frontend(.*)$": "<rootDir>/src/services/frontend$1",
    "@server(.*)$": "<rootDir>/src/services/server$1"
  }
}
