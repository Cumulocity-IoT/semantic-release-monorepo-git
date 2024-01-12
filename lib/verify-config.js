import verifyConfig from '@semantic-release/git/lib/verify.js';
import getError from './get-error.js';
import { isNil, isString } from 'lodash-es';

/**
 * Verifies the configuration for semantic-release-git plugin.
 * @param {object} pluginConfig - The plugin configuration object.
 * @param {object} context - The semantic-release context object.
 * @returns {Array} - An array of errors encountered during verification.
 */
export default (pluginConfig, context) => {
  const { workspaceRoot } = pluginConfig;
  let errors = [];
  if (!isNil(workspaceRoot) && !isNonEmptyString(workspaceRoot)) {
    errors.push(getError('EINVALIDWORKSPACEROOT', workspaceRoot));
  }
  try {
    verifyConfig(pluginConfig);
  } catch (e) {
    const verifyGitErrors = Array.from(e);
    errors = [...errors, ...verifyGitErrors];
  }
  return errors;
};

/**
 * Checks if a value is a non-empty string.
 * @param {any} value - The value to check.
 * @returns {boolean} - True if the value is a non-empty string, false otherwise.
 */
export const isNonEmptyString = (value) => {
  return isString(value) && value.trim();
};
