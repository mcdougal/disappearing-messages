import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Ref = HTMLAnchorElement;

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const TextLink = forwardRef<Ref, Props>(
  ({ children, className, ...otherProps }, ref): React.ReactElement => {
    return (
      <a
        ref={ref}
        className={twMerge(
          `text-blue-600 underline visited:text-purple-600 hover:text-blue-800`,
          className
        )}
        {...otherProps}>
        {children}
      </a>
    );
  }
);

TextLink.displayName = `TextLink`;

export default TextLink;
