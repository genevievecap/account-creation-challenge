import { Button } from 'app/frontend/reusable-components/button/button';
import { Card } from 'app/frontend/reusable-components/card/card';
import { FlowLayout } from 'app/frontend/reusable-components/flow-layout/flow-layout';
import { Input } from 'app/frontend/reusable-components/input/input';
import { InputVariants } from 'app/frontend/reusable-components/input/types';
import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CREATE_ACCOUNT_ERROR_MAP } from './constants';
import { AccountContext } from 'app/frontend/providers/AccountProvider';
import { AccountActionTypes } from 'app/frontend/providers/AccountProvider/types';
import { Alert } from 'app/frontend/reusable-components/alert';
import { AlertContext } from 'app/frontend/providers/AlertProvider';
import { AlertActionTypes } from 'app/frontend/providers/AlertProvider/types';

export function CreateAccount() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [validation, setValidation] = React.useState<{ username?: string; password?: string } | null>(null);
  const navigate = useNavigate();
  const user = useContext(AccountContext);
  const alerts = useContext(AlertContext);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleUsernameChange = useCallback((value: string) => {
    setUsername(value);
    setValidation(null);
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setValidation(null);
  }, []);

  const handleCreateAccount = useCallback(async () => {
    setIsLoading(true);
    setValidation(null);

    alerts?.dispatch({ type: AlertActionTypes.DELETE_ALERT });

    try {
      const res = await fetch('/api/validate_account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (data.username === true && data.password === true) {
        navigate('/signup/account-selection');

        user?.dispatch({ type: AccountActionTypes.SET_USERNAME, payload: { username } });
        return;
      }

      const usernameError = CREATE_ACCOUNT_ERROR_MAP[data.username as keyof typeof CREATE_ACCOUNT_ERROR_MAP];
      const passwordError = CREATE_ACCOUNT_ERROR_MAP[data.password as keyof typeof CREATE_ACCOUNT_ERROR_MAP];

      setValidation({ username: usernameError, password: passwordError });
    } catch (e) {
      setValidation({ username: 'SERVER_ERROR', password: 'SERVER_ERROR' });
    } finally {
      setIsLoading(false);
    }
  }, [username, password, navigate, user]);

  return (
    <FlowLayout>
      <Card titleStyles="pb-4 text-center font-mono font-semibold" title="Create New Account">
        <div className="pb-2">
          <Alert message={alerts?.state?.alert?.message} />
        </div>
        <div className="space-y-2">
          <Input
            dataTest="usernameInput"
            errorText={validation?.username}
            label="Username"
            onChange={handleUsernameChange}
            variant={InputVariants.UNDERLINE}
          />
          <Input
            dataTest="passwordInput"
            errorText={validation?.password}
            label="Password"
            onChange={handlePasswordChange}
            variant={InputVariants.UNDERLINE}
          />
          <div className="pt-2">
            <Button isFullWidth onClick={handleCreateAccount} disabled={isLoading}>
              {isLoading ? 'Validating...' : 'Create Account'}
            </Button>
          </div>
        </div>
      </Card>
    </FlowLayout>
  );
}
