import { jest } from '@jest/globals';
import { temporaryDirectory } from 'tempy';
import fileUrl from 'file-url';
import path from 'path';

describe('prepareGit', () => {
  test('should invoke prepare from @semantic-release/git with base path as current working directory if workspace root is present', async () => {
    const cwd = temporaryDirectory();
    const repositoryUrl = fileUrl(cwd);
    const pluginConfig = { workspaceRoot: './packages' };
    const branch = { name: 'master' };
    const options = { repositoryUrl };
    const env = {};
    const lastRelease = {};
    const nextRelease = { version: '2.0.0', gitTag: 'v2.0.0', notes: 'Test release note' };
    const context = {
      cwd,
      env,
      options,
      branch,
      lastRelease,
      nextRelease,
      logger: { log: jest.fn() }
    };
    jest.unstable_mockModule('@semantic-release/git/lib/prepare.js', () => {
      return {
        __esModule: true,
        default: jest.fn(async () => {
          console.log('mock invoked');
        })
      };
    });
    const prepareModule = await import('@semantic-release/git/lib/prepare.js');
    const prepareGitModule = await import('../lib/prepare-git.js');
    await prepareGitModule.default(pluginConfig, context);

    expect(prepareModule.default).toHaveBeenCalledWith(pluginConfig, {
      ...context,
      cwd: path.resolve(cwd, 'packages')
    });
  });
});
