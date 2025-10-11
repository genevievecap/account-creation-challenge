import React, { useContext, useEffect } from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input';
import { AccountContext } from 'app/frontend/providers/AccountProvider/index.tsx';
import { useNavigate } from 'react-router-dom';

export function JointAccess() {
  const user = useContext(AccountContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.state && !user.state.isValid) {
      navigate('/create-account');
    }
  }, [user, navigate]);

  return (
    <FlowLayout>
      <Card
        isFullWidth
        title="Will this be a joint account?"
        description="Joint accounts allow for a secondary account holder which provides the same level of access as the primary."
      >
        <div className="space-y-2">
          <Input label="First name" />
          <Input label="Last name" />
          <Input label="Email" />
          <Button href="/signup/stock-restrictions">Continue</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
