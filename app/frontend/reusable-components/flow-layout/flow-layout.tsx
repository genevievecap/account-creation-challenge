import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

// TODO: add a create provider that will handle if the guest
// is authenticated or not
// and show the logout button only if the user is authenticated

export function FlowLayout({ children }: Props) {
  const isAuthenticated = true; // Replace with actual authentication logic

  return (
    <div className="h-full mt-5 max-w-[1000px]">
      <div className="w-full text-right">
        {isAuthenticated && (
          <Link to="/logout" reloadDocument>
            Logout
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}
