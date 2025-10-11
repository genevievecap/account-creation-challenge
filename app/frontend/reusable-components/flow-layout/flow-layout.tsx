import { AccountContext } from 'app/frontend/providers/AccountProvider';
import React, { ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export function FlowLayout({ children }: Props) {
  const user = useContext(AccountContext);
  const isValid = user?.state.isValid;

  return (
    <div className="h-full mt-5 max-w-[1000px]">
      <div className="w-full text-right">
        {isValid && (
          <Link to="/logout" reloadDocument>
            Logout
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
