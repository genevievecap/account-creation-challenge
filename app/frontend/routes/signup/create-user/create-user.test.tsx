import { describe } from '@jest/globals';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CreateUser } from './create-user';
import { AccountContext } from 'app/frontend/providers/AccountProvider';
import { AccountStateType } from 'app/frontend/providers/AccountProvider/types';

global.fetch = jest.fn();
const getUserSessionMock = jest.fn();
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));
jest.mock('app/frontend/get-user', () => ({
  getUserSession: () => getUserSessionMock,
}));

describe('CreateUser', () => {
  it('displays proper elements', () => {
    render(<CreateUser />, { wrapper: BrowserRouter });
    expect(screen.getByTestId('first-name')).toBeInTheDocument();
    expect(screen.getByTestId('last-name')).toBeInTheDocument();
  });

  it('routes to create-account when valid user not found', () => {
    jest.resetModules();
    const invalidUser = { state: { isValid: false } as AccountStateType, dispatch: jest.fn() };
    render(
      <AccountContext.Provider value={invalidUser}>
        <BrowserRouter>
          <CreateUser />
        </BrowserRouter>
      </AccountContext.Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/create-account');
  });
});
