// jest-dom is optional in this project checkout; keep tests runnable when it is not installed.
try {
  require('@testing-library/jest-dom');
} catch (error) {
  if (error.code !== 'MODULE_NOT_FOUND') {
    throw error;
  }
}
