import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { AccountContext } from 'app/frontend/providers/AccountProvider/index.tsx';
import { WelcomeMessage } from 'app/frontend/reusable-components/welcomeMessage/index.tsx';

export function AccountSelection() {
  const user = useContext(AccountContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.state && !user.state.isValid) {
      navigate('/create-account');
    }
  }, [user, navigate]);

  return (
    <FlowLayout>
      <WelcomeMessage />
      <Card
        title="What type of account would you like?"
        description="You can open a new account in just 5 minutes."
        isFullWidth
      >
        <div className="space-y-2 first-child:border-t-slate-200">
          <Link
            to="/signup/create-user?type=cash"
            className="text-gray-500 block hover:bg-purple-50 transform-[background-color] duration-100 ease-in p-4 pl-2 rounded-2xl"
          >
            I want to open a cash account.
          </Link>
          <div className="bg-slate-200 h-px w-full" />
          <Link
            to="/signup/create-user?type=investing"
            className="text-gray-500 block hover:bg-purple-50 transform-[background-color] duration-100 ease-in p-4 pl-2 rounded-2xl"
          >
            I want to open an investing account.
          </Link>
        </div>
      </Card>
    </FlowLayout>
  );
}
