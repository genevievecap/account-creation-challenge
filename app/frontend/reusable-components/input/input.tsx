import classNames from 'classnames';
import React, { ChangeEvent, useState } from 'react';
import { InputVariants, VariantTypes } from './types';

interface Props {
  label: string;
  onChange?: (value: string) => void;
  variant?: InputVariants | undefined;
}

export function Input({ onChange, label, variant }: Props) {
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
          'border-4 border-solid border-slate-300': variant === VariantTypes.BLOCK || !variant,
          'border-b-4 border-solid border-slate-300': variant === VariantTypes.UNDERLINE,
        })}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
