import { Button } from 'app/frontend/reusable-components/button/button';
import { ButtonVariants } from 'app/frontend/reusable-components/button/types';
import { Card } from 'app/frontend/reusable-components/card/card';
import { FlowLayout } from 'app/frontend/reusable-components/flow-layout/flow-layout';
import { Input } from 'app/frontend/reusable-components/input/input';
import { InputVariants } from 'app/frontend/reusable-components/input/types';
import React from 'react';

export function CreateAccount() {
  return (
    <FlowLayout>
      <Card titleStyles="pb-4 text-center font-mono font-semibold" title="Create New Account">
        <div className="space-y-2">
          <Input label="Username" variant={InputVariants.UNDERLINE} />
          <Input label="Password" variant={InputVariants.UNDERLINE} />
          <div className="pt-2">
            <Button href="/signup/account-selection" isFullWidth>
              Create Account
            </Button>
          </div>
          <Button variant={ButtonVariants.TERTIARY}>Skip</Button>
        </div>
      </Card>
    </FlowLayout>
  );
}
