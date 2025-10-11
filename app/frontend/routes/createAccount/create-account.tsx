import { Button } from 'app/frontend/reusable-components/button/button';
import { ButtonVariants } from 'app/frontend/reusable-components/button/types';
import { Card } from 'app/frontend/reusable-components/card/card';
import { FlowLayout } from 'app/frontend/reusable-components/flow-layout/flow-layout';
import { Input } from 'app/frontend/reusable-components/input/input';
import { InputVariants } from 'app/frontend/reusable-components/input/types';
import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CREATE_ACCOUNT_ERROR_MAP } from './constants';
import { AccountContext } from 'app/frontend/providers/AccountProvider';
import { AccountActionTypes } from 'app/frontend/providers/AccountProvider/types';

export function CreateAccount() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [validation, setValidation] = React.useState<{ username?: string; password?: string } | null>(null);
  const navigate = useNavigate();
  const user = useContext(AccountContext);
  const [loading, setLoading] = React.useState(false);

  const handleUsernameChange = useCallback((value: string) => {
    setUsername(value);
    setValidation(null);
  }, []);

  const handlePasswordChange = useCallback((value: string) => {
    setPassword(value);
    setValidation(null);
  }, []);

  const handleCreateAccount = useCallback(async () => {
    setLoading(true);
    setValidation(null);
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
      setLoading(false);
    }
  }, [username, password, navigate]);

  return (
    <FlowLayout>
      <Card titleStyles="pb-4 text-center font-mono font-semibold" title="Create New Account">
        <div className="space-y-2">
          <Input
            errorText={validation?.username}
            label="Username"
            onChange={handleUsernameChange}
            variant={InputVariants.UNDERLINE}
          />
          <Input
            errorText={validation?.password}
            label="Password"
            onChange={handlePasswordChange}
            variant={InputVariants.UNDERLINE}
          />
          <div className="pt-2">
            <Button isFullWidth onClick={handleCreateAccount} disabled={loading}>
              {loading ? 'Validating...' : 'Create Account'}
            </Button>
          </div>
          <Button variant={ButtonVariants.TERTIARY}>Skip</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
