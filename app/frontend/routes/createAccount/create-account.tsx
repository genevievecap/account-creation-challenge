import { Button } from 'app/frontend/reusable-components/button/button';
import { Card } from 'app/frontend/reusable-components/card/card';
import { FlowLayout } from 'app/frontend/reusable-components/flow-layout/flow-layout';
import { Input } from 'app/frontend/reusable-components/input/input';
import { VariantTypes } from 'app/frontend/reusable-components/input/types';
import React from 'react';


export function CreateAccount() {
  return (
    <FlowLayout>
      <Card title="Create New Account">
        <div className="space-y-2">
          <Input label="Username" variant={VariantTypes.UNDERLINE}/>
          <Input label="Password" variant={VariantTypes.UNDERLINE}/>
          <Button href="/signup/joint-access">Create Account</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
