import React from 'react';

interface AlertProps {
  message?: string;
}

export const Alert = ({ message }: AlertProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-yellow-500 flex-shrink-0"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.764-1.36 2.722-1.36 3.486 0l6.518 11.614c.75 1.338-.213 3.037-1.742 3.037H3.48c-1.53 0-2.492-1.7-1.742-3.037L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V8a1 1 0 112 0v2a1 1 0 01-1 1z"
          clipRule="evenodd"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
};
