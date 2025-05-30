import verifyConfig from './lib/verify-config.js';
import prepareGit from './lib/prepare-git.js';
import AggregateError from 'aggregate-error';

let verified;

/**
 * Verifies the conditions for the release.
 *
 * @param {Object} pluginConfig - The plugin configuration.
 * @param {Object} context - The semantic-release context.
 * @throws {AggregateError} - If the conditions are not met.
 */
export const verifyConditions = (pluginConfig, context) => {
  const errors = verifyConfig(pluginConfig);
  if (errors.length > 0) throw new AggregateError(errors);
  verified = true;
  const {logger} = context;
  logger.log('verifyConditions monorepo-git plugin');
};

/**
 * Prepares the repository for the release.
 *
 * @param {Object} pluginConfig - The plugin configuration.
 * @param {Object} context - The semantic-release context.
 * @throws {AggregateError} - If the conditions are not met or the configuration is invalid.
 */
export const prepare = async (pluginConfig, context) => {
  const errors = verified ? [] : verifyConfig(pluginConfig);
  if (errors.length > 0) throw new AggregateError(errors);
  const {logger} = context;
  logger.log('prepare monorepo-git plugin');
  await prepareGit(pluginConfig, context);
};
