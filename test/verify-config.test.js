import verifyConfig from '../lib/verify-config.js';

describe('verifyConfig', () => {
  test('should return error if workspaceRoot is not a string', () => {
    const errors = verifyConfig({ workspaceRoot: 1 });
    expect(errors).toHaveLength(1);
    expect(errors[0].code).toBe('EINVALIDWORKSPACEROOT');
  });
  test('should return error if workspaceRoot is an empty string', () => {
    const errors = verifyConfig({ workspaceRoot: '' });
    expect(errors).toHaveLength(1);
    expect(errors[0].code).toBe('EINVALIDWORKSPACEROOT');
  });
  test('should return error if assets is not a string array', () => {
    const errors = verifyConfig({ assets: 1 });
    expect(errors).toHaveLength(1);
    expect(errors[0].code).toBe('EINVALIDASSETS');
  });
});
