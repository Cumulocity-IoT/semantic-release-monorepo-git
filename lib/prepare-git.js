import path from 'path';
import prepare from '@semantic-release/git/lib/prepare.js';

/**
 * Prepares the Git repository for semantic release.
 *
 * @param {Object} pluginConfig - The configuration object for the plugin.
 * @param {Object} context - The context object containing information about the release.
 * @param {string} pluginConfig.workspaceRoot - The root directory of the workspace.
 * @param {string} context.cwd - The current working directory.
 * @returns {Promise<void>} - A promise that resolves when the Git repository is prepared.
 */
export default async (pluginConfig, context) => {
  const { workspaceRoot } = pluginConfig;
  let { cwd } = context;
  const separatorExp = '/[\\/]/';
  if (workspaceRoot) {
    const basePath = path.isAbsolute(workspaceRoot)
      ? workspaceRoot
      : path.resolve(cwd, ...workspaceRoot.split(separatorExp));
    context.cwd = basePath;
  }
  await prepare(pluginConfig, context);
};
