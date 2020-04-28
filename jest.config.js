module.exports = {
  moduleNameMapper: {
    "^@root/(.+)": "<rootDir>/src/$1",
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  moduleFileExtesions: ["ts", "tsx", "js"],
  testMatch: ["**/tests/**/*.test.+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
