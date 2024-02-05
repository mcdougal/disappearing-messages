/* eslint-disable @typescript-eslint/naming-convention */
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { IconButtonIcon, IconButtonSize } from './types';

type Ref = HTMLButtonElement;

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: IconButtonIcon;
  label: string;
  size: IconButtonSize;
};

const IconButton = forwardRef<Ref, Props>(
  (
    { className, icon, label, size, type = `button`, ...buttonProps },
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

    return (
      <button
        ref={ref}
        aria-label={label}
        className={twMerge(
          `rounded-full hover:bg-gray-200`,
          classNameBySize[size],
          className
        )}
        tabIndex={0}
        title={label}
        type={type}
        {...buttonProps}>
        <Icon className={iconClassNameBySize[size]} />
      </button>
    );
  }
);

IconButton.displayName = `IconButton`;

export default IconButton;
