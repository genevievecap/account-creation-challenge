import { describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AccountContext } from 'app/frontend/providers/AccountProvider';
import { AccountStateType } from 'app/frontend/providers/AccountProvider/types';
import { Deposit } from './deposit';
import '@testing-library/jest-dom';

global.fetch = jest.fn();
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Deposit', () => {
  it('displays proper elements', () => {
    render(<Deposit />, { wrapper: BrowserRouter });
    expect(screen.getByText('Deposit funds')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Start over' })).toBeInTheDocument();
  });

  it('routes to create-account when valid user not found', () => {
    jest.resetModules();
    const invalidUser = { state: { isValid: false } as AccountStateType, dispatch: jest.fn() };
    render(
      <AccountContext.Provider value={invalidUser}>
        <BrowserRouter>
          <Deposit />
        </BrowserRouter>
      </AccountContext.Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/create-account');
  });
});
