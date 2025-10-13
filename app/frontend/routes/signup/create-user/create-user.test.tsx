import { describe, test } from '@jest/globals';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CreateUser } from './create-user';

describe('CreateUser', () => {
  test('render', () => {});
  render(<CreateUser />, { wrapper: BrowserRouter });
  screen.getByLabelText('First name');
  screen.getByLabelText('Last name');
});
