export const USERNAME_NOT_VALID = 'USERNAME_NOT_VALID';
export const PASSWORD_NOT_VALID = 'PASSWORD_NOT_VALID';
export const NO_USERNAME_GIVEN = 'NO_USERNAME_GIVEN';
export const NO_PASSWORD_GIVEN = 'NO_PASSWORD_GIVEN';
export const PASSWORD_LETTER_NUMBER_MISSING = 'PASSWORD_LETTER_NUMBER_MISSING';
export const SERVER_ERROR = 'SERVER_ERROR';

export const CREATE_ACCOUNT_ERROR_MAP = {
  NO_USERNAME_GIVEN: 'Please provide a username.',
  USERNAME_NOT_VALID: 'Username must be between 10 and 50 characters.',
  NO_PASSWORD_GIVEN: 'Please provide a password.',
  PASSWORD_NOT_VALID: 'Password must be between 20 and 50 characters.',
  PASSWORD_LETTER_NUMBER_MISSING: 'Password must contain at least one letter and one number.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
};
