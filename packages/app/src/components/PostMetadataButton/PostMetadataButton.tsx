/* eslint-disable @typescript-eslint/naming-convention */
'use client';

import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import Typography from '../Typography';

type Ref = HTMLButtonElement;

type Props = {
  completed?: boolean;
  disabled?: boolean;
  icon: (props: { className?: string }) => React.ReactNode;
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  value: number;
};

const PostMetadataButton = forwardRef<Ref, Props>(
  (
    { completed, disabled, icon, label, onClick, type = `button`, value },
    ref
  ): React.ReactElement => {
    const Icon = icon;

    return (
      <button
        ref={ref}
        aria-label={label}
        className={twMerge(
          `flex items-center gap-2 rounded-full px-3 py-2`,
          completed ? `bg-red-500 text-white` : `bg-gray-100 hover:bg-gray-200`
        )}
        disabled={disabled || completed}
        onClick={onClick}
        title={label}
        type={type}>
        <Icon className="h-4 w-4" />
        <Typography size="xs">{value}</Typography>
      </button>
    );
  }
);

PostMetadataButton.displayName = `PostMetadataButton`;

export default PostMetadataButton;
