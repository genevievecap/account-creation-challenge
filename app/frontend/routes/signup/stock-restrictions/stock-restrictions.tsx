import React, { useContext, useEffect } from 'react';
import { Button } from '../../../reusable-components/button/button.tsx';
import { Card } from '../../../reusable-components/card/card.tsx';
import { FlowLayout } from '../../../reusable-components/flow-layout/flow-layout.tsx';
import { Input } from '../../../reusable-components/input/input.tsx';
import { AccountContext } from 'app/frontend/providers/AccountProvider/index.tsx';
import { useNavigate } from 'react-router-dom';

export function StockRestrictions() {
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
        title="Are you restricted from trading any stocks?"
        description="If you are a broker dealer or registered representative of another company, you may be restricted from trading that stock."
      >
        {/*<li>style UI to look like given mock, make sure the typeahead is realtime feeling search</li>*/}
        <div className="space-y-2">
          <Input label="Stock Symbol" />
          <Button href="/signup/deposit">Continue</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
