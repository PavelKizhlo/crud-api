/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  roots: ["./src"],
  transform: {
    "\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "(.+)\\.js": "$1",
  },
};
