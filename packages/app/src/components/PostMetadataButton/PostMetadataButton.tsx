/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import Link from 'next/link';
import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import Typography from '../Typography';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ref = any;

type Props = {
  completed?: boolean;
  disabled?: boolean;
  href?: string;
  icon: (props: { className?: string }) => React.ReactNode;
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  value: number;
};

const PostMetadataButton = forwardRef<Ref, Props>(
  (
    { completed, disabled, href, icon, label, onClick, type = `button`, value },
    ref
  ): React.ReactElement => {
    const Component = href ? `a` : `button`;
    const Icon = icon;

    const button = (
      <Component
        ref={ref}
        aria-label={label}
        className={twMerge(
          `flex items-center gap-2 rounded-full px-3 py-2`,
          completed ? `bg-red-500 text-white` : `bg-gray-100 hover:bg-gray-200`
        )}
        disabled={disabled || completed}
        onClick={onClick}
        tabIndex={0}
        title={label}
        type={type}>
        <Icon className="h-4 w-4" />
        <Typography size="xs">{value}</Typography>
      </Component>
    );

    return href ? (
      <Link href={href} legacyBehavior passHref>
        {button}
      </Link>
    ) : (
      button
    );
  }
);

PostMetadataButton.displayName = `PostMetadataButton`;

export default PostMetadataButton;
