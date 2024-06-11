module.exports = {
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  testMatch: ["**/__test__/**/*.[jt]s?(x)"],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
