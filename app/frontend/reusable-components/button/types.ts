import { ReactNode } from 'react';

export interface ButtonProps {
  type?: 'button' | 'submit';
  href?: string;
  children: ReactNode;
  isFullWidth?: boolean;
  variant?: VariantTypes | undefined;
}

export enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export type VariantTypes = ButtonVariants.PRIMARY | ButtonVariants.SECONDARY | ButtonVariants.TERTIARY;
