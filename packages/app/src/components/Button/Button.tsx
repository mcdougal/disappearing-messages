/* eslint-disable @typescript-eslint/naming-convention */
import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import { ButtonColor, ButtonIcon, ButtonSize } from './types';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
  color?: ButtonColor;
  endIcon?: ButtonIcon;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  size: ButtonSize;
  startIcon?: ButtonIcon;
  tabIndex?: number;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}>;

const Button = ({
  children,
  className,
  color = `primary`,
  endIcon,
  onClick,
  size,
  startIcon,
  tabIndex,
  type = `button`,
}: Props): React.ReactElement => {
  const EndIcon = endIcon;
  const StartIcon = startIcon;

  const classNameByColor: { [key in ButtonColor]: string } = {
    primary: `bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
    secondary: `bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400`,
  };

  const classNameBySize: { [key in ButtonSize]: string } = {
    xs: `gap-x-1 px-2 py-1 text-xs rounded`,
    sm: `gap-x-1.5 px-2 py-1 text-sm rounded`,
    md: `gap-x-1.5 px-2.5 py-1.5 text-sm rounded-md`,
    lg: `gap-x-2 px-3 py-2 text-sm rounded-md`,
    xl: `gap-x-2 px-3.5 py-2.5 text-sm rounded-md`,
  };

  const iconClassNameBySize: { [key in ButtonSize]: string } = {
    xs: `h-4 w-4`,
    sm: `h-4 w-4`,
    md: `h-5 w-5`,
    lg: `h-5 w-5`,
    xl: `h-5 w-5`,
  };

  return (
    <button
      className={classNames(
        `inline-flex items-center justify-center font-semibold shadow-sm`,
        classNameBySize[size],
        classNameByColor[color],
        className
      )}
      onClick={onClick}
      tabIndex={tabIndex}
      type={type}>
      {StartIcon && (
        <div className="flex h-0 items-center">
          <StartIcon aria-hidden="true" className={iconClassNameBySize[size]} />
        </div>
      )}
      {children}
      {EndIcon && (
        <div className="flex h-0 items-center">
          <EndIcon aria-hidden="true" className={iconClassNameBySize[size]} />
        </div>
      )}
    </button>
  );
};

export default Button;
