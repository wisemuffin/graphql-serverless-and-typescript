/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */

const { defaults: tsjPreset } = require("ts-jest/presets");

/**
 * need to add "@shelf/jest-dynamodb" to preset
 * use a test database not DEV
 * drop all data when test is complete
 * when i run yarn test, it also starts up the server
 */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
