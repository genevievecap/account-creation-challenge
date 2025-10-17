import { AccountContext } from 'app/frontend/providers/AccountProvider';
import { AccountActionTypes } from 'app/frontend/providers/AccountProvider/types';
import React, { ReactNode, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button/button';
import { ButtonVariants } from '../button/types';
import { getCookie, eraseCookie } from 'app/frontend/cookies/helpers';

interface Props {
  children: ReactNode;
}

export function FlowLayout({ children }: Props) {
  const user = useContext(AccountContext);
  const navigate = useNavigate();
  const sessionToken = getCookie('session_token');
  const isValid = user?.state.isValid || Boolean(sessionToken);

  const handleLogout = useCallback(() => {
    user?.dispatch({ type: AccountActionTypes.DELETE_USERNAME });
    eraseCookie('session_token');
    navigate('/create-account');
  }, [user, navigate]);

  return (
    <div className="h-full mt-5 max-w-[1000px]">
      <div className="w-full text-right">
        {isValid && (
          <Button onClick={handleLogout} variant={ButtonVariants.TERTIARY} type="button">
            Logout
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}
