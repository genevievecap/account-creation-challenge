import React, { useContext, useEffect } from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input';
import { AccountContext } from 'app/frontend/providers/AccountProvider/index.tsx';
import { useNavigate } from 'react-router-dom';

export function CreateUser() {
  const user = useContext(AccountContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.state && !user.state.isValid) {
      navigate('/create-account');
    }
  }, [user, navigate]);

  return (
    <FlowLayout>
      <Card title="What's your first and last name?" isFullWidth>
        <div className="space-y-2">
          <Input label="First name" />
          <Input label="Last name" />
          <Input label="Email" />
          <Button href="/signup/joint-access">Continue</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
