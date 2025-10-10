import { Button } from 'app/frontend/reusable-components/button/button';
import { Card } from 'app/frontend/reusable-components/card/card';
import { FlowLayout } from 'app/frontend/reusable-components/flow-layout/flow-layout';
import { Input } from 'app/frontend/reusable-components/input/input';
import React from 'react';


export function CreateAccount() {
  return (
    <FlowLayout>
      <Card title="What's your first and last name?">
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
