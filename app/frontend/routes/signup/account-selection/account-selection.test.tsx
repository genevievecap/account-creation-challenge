import { describe } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AccountSelection } from './account-selection';
import '@testing-library/jest-dom';
import { AccountContext } from 'app/frontend/providers/AccountProvider';
import { AccountStateType } from 'app/frontend/providers/AccountProvider/types';

global.fetch = jest.fn();
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AccountSelection', () => {
  it('displays proper elements', () => {
    render(<AccountSelection />, { wrapper: BrowserRouter });
    expect(screen.getByTestId('welcome-message')).toBeInTheDocument();
    expect(screen.getByText('I want to open a cash account.')).toBeInTheDocument();
    expect(screen.getByText('I want to open an investing account.')).toBeInTheDocument();
  });

  it('routes to create-account when valid user not found', () => {
    jest.resetModules();
    const invalidUser = { state: { isValid: false } as AccountStateType, dispatch: jest.fn() };
    render(
      <AccountContext.Provider value={invalidUser}>
        <BrowserRouter>
          <AccountSelection />
        </BrowserRouter>
      </AccountContext.Provider>
    );

    // The effect should trigger navigation
    expect(mockNavigate).toHaveBeenCalledWith('/create-account');
  });
});
