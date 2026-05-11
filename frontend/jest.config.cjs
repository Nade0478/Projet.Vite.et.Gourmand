module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  testPathIgnorePatterns: ["/node_modules/"],
  watchPathIgnorePatterns: ["/node_modules/"],
  roots: ["<rootDir>/src"],
};
