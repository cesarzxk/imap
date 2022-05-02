 module.exports = {
    testPathIgnorePatterns: ["/node_modules/","/.next/"],
    setupFilesAfterEnv: ["<rootDir>/src/__tests__/setupTests.ts"],
    transform: {"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"},
    moduleNameMapper: {"\\.(scss|css|sass)$": "identity-obj-proxy"},
    testEnvironment: "jsdom",
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.tsx","!src/**/*.test.tsx","!src/**/_app.tsx","!src/**/_document.tsx"],
    coverageReporters: ["lcov", "json"]
}
