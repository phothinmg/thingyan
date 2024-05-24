import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  coverageReporters: ["json", "html"],
  coverageDirectory: "coverage",
};

export default config;
