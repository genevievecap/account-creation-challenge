import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ButtonProps, ButtonVariants } from './types';
import classNames from 'classnames';

export function Button({ href, children, type, variant, isFullWidth, onClick, disabled }: ButtonProps) {
  const buttonStyling = useMemo(() => {
    switch (variant) {
      case ButtonVariants.PRIMARY:
        return 'py-3 px-6 bg-[hsla(244,49%,49%,1)] text-white rounded-[8px]';
      case ButtonVariants.SECONDARY:
        return 'py-3 px-6 bg-white text-[hsla(244,49%,49%,1)] rounded-[8px]';
      case ButtonVariants.TERTIARY:
        return 'pt-1 pr-2 border-b-4 border-solid border-slate-500 text-slate-500';
      default:
        return 'py-3 px-6 bg-[hsla(244,49%,49%,1)] text-white rounded-[8px]';
    }
  }, []);

  if (href) {
    return (
      <Link
        to={href}
        className={classNames('inline-block', buttonStyling, {
          'w-full text-center': isFullWidth,
        })}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classNames('inline-block ', buttonStyling, {
        'w-full text-center': isFullWidth,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
