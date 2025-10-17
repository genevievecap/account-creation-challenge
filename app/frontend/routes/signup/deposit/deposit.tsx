import React, { useContext, useEffect } from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input.tsx';
import { AccountContext } from 'app/frontend/providers/AccountProvider/index.tsx';
import { useNavigate } from 'react-router-dom';
import { SIGN_UP_ERROR_MESSAGE } from 'app/frontend/constants.ts';
import { AlertContext } from 'app/frontend/providers/AlertProvider/index.tsx';
import { AlertActionTypes } from 'app/frontend/providers/AlertProvider/types.ts';
import { getCookie } from 'app/frontend/cookies/helpers.ts';
import { AccountActionTypes } from 'app/frontend/providers/AccountProvider/types.ts';

export function Deposit() {
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
      <Card isFullWidth title="Deposit funds" description="Accounts can be funded with as little as $5.">
        <div className="space-y-2">
          <Input dataTest="deposit-amount" label="Deposit Amount" />
          <Button href="/signup/account-selection">Start over</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
