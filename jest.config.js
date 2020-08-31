/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */

const { defaults: tsPreset } = require("ts-jest/presets");
const jestDynamo = require("@shelf/jest-dynamodb/jest-preset");
/**
 * need to add "@shelf/jest-dynamodb" to preset
 * use a test database not DEV
 * drop all data when test is complete
 * when i run yarn test, it also starts up the server
 */
module.exports = {
  // preset: "ts-jest",
  testEnvironment: "node",
  ...tsPreset,
  ...jestDynamo,
  globals: {
    test_url: `http://${process.env.HOST || "127.0.0.1"}:${
      process.env.PORT || 3000
    }`,
  },
};
