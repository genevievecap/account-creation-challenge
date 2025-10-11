import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { InputVariants } from './types';

interface InputProps {
  label: string;
  onChange?: (value: string) => void;
  variant?: InputVariants | undefined;
  errorText?: string;
}

export function Input({ onChange, label, variant, errorText }: InputProps) {
  const [value, setValue] = useState('');
  const id = label.replace(/ /gm, '_');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange?.(event.target.value);
  }
  return (
    <div>
      <label className="block text-sm">{label}</label>
      <input
        id={id}
        className={classNames('block w-full p-2', {
          'border-4 border-solid border-slate-300': variant === InputVariants.BLOCK || !variant,
          'border-b-4 border-solid border-slate-300': variant === InputVariants.UNDERLINE,
        })}
        value={value}
        onChange={handleChange}
      />
      {errorText && <div className="text-orange-500 text-xs">{errorText}</div>}
    </div>
  );
}
