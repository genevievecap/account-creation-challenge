import { describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AccountContext } from 'app/frontend/providers/AccountProvider';
import { AccountStateType } from 'app/frontend/providers/AccountProvider/types';
import '@testing-library/jest-dom';
import { StockRestrictions } from './stock-restrictions';

global.fetch = jest.fn();
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('StockRestrictions', () => {
  it('displays proper elements', () => {
    render(<StockRestrictions />, { wrapper: BrowserRouter });
    expect(screen.getByTestId('stock-symbol')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Continue' })).toBeInTheDocument();
  });

  it('routes to create-account when valid user not found', () => {
    jest.resetModules();
    const invalidUser = { state: { isValid: false } as AccountStateType, dispatch: jest.fn() };
    render(
      <AccountContext.Provider value={invalidUser}>
        <BrowserRouter>
          <StockRestrictions />
        </BrowserRouter>
      </AccountContext.Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/create-account');
  });
});
