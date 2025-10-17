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

export function JointAccess() {
  const user = useContext(AccountContext);
  const alerts = useContext(AlertContext);
  const navigate = useNavigate();
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
      <Card
        isFullWidth
        title="Will this be a joint account?"
        description="Joint accounts allow for a secondary account holder which provides the same level of access as the primary."
      >
        <div className="space-y-2">
          <Input dataTest="first-name-joint-access" label="First name" />
          <Input dataTest="last-name-joint-access" label="Last name" />
          <Input dataTest="email-joint-access" label="Email" />
          <Button href="/signup/stock-restrictions">Continue</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
