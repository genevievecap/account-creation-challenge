import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { CreateAccount } from './create-account';
import {
  CREATE_ACCOUNT_ERROR_MAP,
  NO_PASSWORD_GIVEN,
  NO_USERNAME_GIVEN,
  PASSWORD_LETTER_NUMBER_MISSING,
  PASSWORD_NOT_VALID,
  SERVER_ERROR,
  USERNAME_NOT_VALID,
} from './constants';

global.fetch = jest.fn();
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('CreateAccount', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('renders username and password inputs', () => {
    render(<CreateAccount />);
    expect(screen.getByTestId('usernameInput')).toBeInTheDocument();
    expect(screen.getByTestId('passwordInput')).toBeInTheDocument();
  });

  it('shows validation errors from backend', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ username: 'USERNAME_NOT_VALID', password: 'PASSWORD_NOT_VALID' }),
    });
    render(<CreateAccount />);
    fireEvent.change(screen.getByTestId('usernameInput'), { target: { value: 'short' } });
    fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    await waitFor(() => {
      expect(screen.getByText(CREATE_ACCOUNT_ERROR_MAP[USERNAME_NOT_VALID])).toBeInTheDocument();
      expect(screen.getByText(CREATE_ACCOUNT_ERROR_MAP[PASSWORD_NOT_VALID])).toBeInTheDocument();
    });
  });

  it.each`
    usernameError         | passwordError                     | usernameInput      | passwordInput
    ${NO_USERNAME_GIVEN}  | ${NO_PASSWORD_GIVEN}              | ${''}              | ${''}
    ${USERNAME_NOT_VALID} | ${PASSWORD_NOT_VALID}             | ${'short'}         | ${'short'}
    ${USERNAME_NOT_VALID} | ${PASSWORD_LETTER_NUMBER_MISSING} | ${'validusername'} | ${'aaaaaaaaaaaaaaaaaaaaaaa'}
    ${SERVER_ERROR}       | ${PASSWORD_NOT_VALID}             | ${'short'}         | ${''}
    ${USERNAME_NOT_VALID} | ${SERVER_ERROR}                   | ${''}              | ${'short'}
  `(
    'should show proper validation for $usernameError and $passwordError',
    async ({ usernameError, passwordError, usernameInput, passwordInput }) => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({ username: usernameError, password: passwordError }),
      });
      render(<CreateAccount />);
      fireEvent.change(screen.getByTestId('usernameInput'), { target: { value: usernameInput } });
      fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: passwordInput } });
      fireEvent.click(screen.getByRole('button', { name: /create account/i }));
      await waitFor(() => {
        expect(
          screen.getByText(CREATE_ACCOUNT_ERROR_MAP[usernameError as keyof typeof CREATE_ACCOUNT_ERROR_MAP])
        ).toBeInTheDocument();
        expect(
          screen.getByText(CREATE_ACCOUNT_ERROR_MAP[passwordError as keyof typeof CREATE_ACCOUNT_ERROR_MAP])
        ).toBeInTheDocument();
      });
    }
  );

  it('navigates to account selection on valid input', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => ({ username: true, password: true }),
    });
    render(<CreateAccount />);
    fireEvent.change(screen.getByTestId('usernameInput'), { target: { value: 'validusername' } });
    fireEvent.change(screen.getByTestId('passwordInput'), { target: { value: 'validpassword1234567890' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/signup/account-selection');
    });
  });
});
