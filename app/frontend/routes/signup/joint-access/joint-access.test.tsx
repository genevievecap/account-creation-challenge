import { describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AccountContext } from 'app/frontend/providers/AccountProvider';
import { AccountStateType } from 'app/frontend/providers/AccountProvider/types';
import { JointAccess } from './joint-access';
import '@testing-library/jest-dom';

global.fetch = jest.fn();
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('JointAccess', () => {
  it('displays proper elements', () => {
    render(<JointAccess />, { wrapper: BrowserRouter });
    expect(screen.getByText('Will this be a joint account?')).toBeInTheDocument();
    expect(screen.getByTestId('first-name-joint-access')).toBeInTheDocument();
    expect(screen.getByTestId('last-name-joint-access')).toBeInTheDocument();
    expect(screen.getByTestId('email-joint-access')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Continue' })).toBeInTheDocument();
  });

  it('routes to create-account when valid user not found', () => {
    jest.resetModules();
    const invalidUser = { state: { isValid: false } as AccountStateType, dispatch: jest.fn() };
    render(
      <AccountContext.Provider value={invalidUser}>
        <BrowserRouter>
          <JointAccess />
        </BrowserRouter>
      </AccountContext.Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/create-account');
  });
});
