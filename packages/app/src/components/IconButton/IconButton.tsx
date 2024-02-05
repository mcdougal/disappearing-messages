/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import Link from 'next/link';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { IconButtonIcon, IconButtonSize } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ref = any;

type CommonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconButtonIcon;
  label: string;
  size: IconButtonSize;
};

type ConditionalProps =
  | ({ as?: `button` } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: `a` } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
        href: string;
      });

type Props = CommonProps & ConditionalProps;

const IconButton = forwardRef<Ref, Props>(
  (
    { className, icon, label, size, ...otherProps },
    ref
  ): React.ReactElement => {
    const Icon = icon;

    const classNameBySize: { [key in IconButtonSize]: string } = {
      xs: `p-2`,
      sm: `p-2`,
      md: `p-2`,
      lg: `p-2`,
      xl: `p-2`,
    };

    const iconClassNameBySize: { [key in IconButtonSize]: string } = {
      xs: `h-3 w-3`,
      sm: `h-4 w-4`,
      md: `h-5 w-5`,
      lg: `h-6 w-6`,
      xl: `h-7 w-7`,
    };

    const containerProps = {
      'aria-label': label,
      className: twMerge(
        `rounded-full hover:bg-gray-200`,
        classNameBySize[size],
        className
      ),
      tabIndex: 0,
      title: label,
    };

    const inner = <Icon className={iconClassNameBySize[size]} />;

    if (!otherProps.as || otherProps.as === `button`) {
      const { type = `button` } = otherProps;

      return (
        <button ref={ref} {...containerProps} {...otherProps} type={type}>
          {inner}
        </button>
      );
    }

    if (otherProps.as === `a`) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { as, ...anchorProps } = otherProps;

      return (
        <Link {...containerProps} {...anchorProps}>
          {inner}
        </Link>
      );
    }

    const exhaustiveCheck: never = otherProps.as;
    return exhaustiveCheck;
  }
);

IconButton.displayName = `IconButton`;

export default IconButton;
