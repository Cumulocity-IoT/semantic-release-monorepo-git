/**
 * Represents an error for an invalid workspace root.
 * @param {string} path - The invalid workspace path.
 * @returns {Object} - The error object.
 * @property {string} message - The error message.
 * @property {string} details - Additional details about the error.
 */
export const EINVALIDWORKSPACEROOT = (path) => {
  return {
    message: `Invalid workspace path: ${path}`,
    details: `The workspace root must be a non empty string and must exist`
  };
};
