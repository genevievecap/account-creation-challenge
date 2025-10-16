import { AccountContext } from 'app/frontend/providers/AccountProvider';
import React, { useContext } from 'react';

export const WelcomeMessage = () => {
  const user = useContext(AccountContext);
  return (
    <div data-testid="welcome-message" className="text-center mb-8">
      <h1 className="text-3xl font-mono font-bold">Welcome {user?.state.username || 'Guest'}!</h1>
      <p className="text-gray-600">We're glad to have you here.</p>
    </div>
  );
};
