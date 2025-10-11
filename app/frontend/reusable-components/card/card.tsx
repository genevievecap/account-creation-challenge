import classNames from 'classnames';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
  description?: string;
  isFullWidth?: boolean;
  titleStyles?: string;
}

export function Card({ children, title, description, isFullWidth, titleStyles }: Props) {
  return (
    <section
      className={classNames('p-10 shadow-card min-h-[400px] rounded-2xl border border-solid border-slate-200', {
        'w-full': isFullWidth,
        'w-[450px] mx-auto': !isFullWidth,
      })}
    >
      <h1 className={classNames('text-2xl font-medium m-0 mb-1', titleStyles)}>{title}</h1>
      <p className="text-[hsla(243,30%,13%,.63)] text-base m-0 mb-1">{description}</p>
      {children}
    </section>
  );
}
