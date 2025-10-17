import React, { useContext, useEffect } from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input';
import { AccountContext } from 'app/frontend/providers/AccountProvider/index.tsx';
import { useNavigate } from 'react-router-dom';
import { SIGN_UP_ERROR_MESSAGE } from 'app/frontend/constants.ts';
import { AlertContext } from 'app/frontend/providers/AlertProvider/index.tsx';
import { AlertActionTypes } from 'app/frontend/providers/AlertProvider/types.ts';
import { getCookie } from 'app/frontend/cookies/helpers.ts';
import { AccountActionTypes } from 'app/frontend/providers/AccountProvider/types.ts';

export function CreateUser() {
  const user = useContext(AccountContext);
  const navigate = useNavigate();
  const alerts = useContext(AlertContext);
  const sessionToken = getCookie('session_token');
  const shouldRoute = !sessionToken && (!user?.state.isValid || !user);

  useEffect(() => {
    if (shouldRoute) {
      console.log('user is not valid, redirecting to create-account');
      navigate('/create-account');
      alerts?.dispatch({
        type: AlertActionTypes.SET_ALERT,
        payload: { alert: { message: SIGN_UP_ERROR_MESSAGE } },
      });
    }
    if (!user?.state.username) {
      user?.dispatch({ type: AccountActionTypes.SET_USERNAME, payload: { username: sessionToken || 'Guest' } });
    }
  }, [user, navigate, alerts]);

  return (
    <FlowLayout>
      <Card title="What's your first and last name?" isFullWidth>
        <div className="space-y-2">
          <Input dataTest="first-name" label="First name" />
          <Input dataTest="last-name" label="Last name" />
          <Input dataTest="email" label="Email" />
          <Button href="/signup/joint-access">Continue</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
