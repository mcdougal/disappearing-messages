'use client';

import { TextareaHTMLAttributes, forwardRef, useId } from 'react';
import { twMerge } from 'tailwind-merge';

import styles from './Textarea.module.scss';

type Ref = HTMLDivElement;

type Props = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'id' | 'className'
>;

const Textarea = forwardRef<Ref, Props>(
  ({ onChange, placeholder, ...textareaProps }, ref): React.ReactElement => {
    const id = useId();
    const textareaHeightAffectingClassNames = [`p-0`, `text-lg`, `leading-6`];
    const textareaAfterClassNames = textareaHeightAffectingClassNames.map(
      (c) => {
        return `after:${c}`;
      }
    );

    return (
      <div
        ref={ref}
        className={twMerge(
          ...textareaAfterClassNames,
          styles.textAreaContainer
        )}>
        {placeholder && (
          <label className="sr-only" htmlFor={id}>
            {placeholder}
          </label>
        )}
        <textarea
          className={twMerge(
            ...textareaHeightAffectingClassNames,
            `block w-full resize-none border-0 bg-transparent px-0 text-gray-900 placeholder:text-gray-400 focus:ring-0`
          )}
          defaultValue=""
          id={id}
          onChange={(event): void => {
            const { parentNode } = event.currentTarget;
            if (parentNode && parentNode instanceof HTMLElement) {
              parentNode.dataset.replicatedValue = event.currentTarget.value;
            }
            if (onChange) {
              onChange(event);
            }
          }}
          placeholder={
            placeholder
              ? placeholder.trim().replace(/\s+/g, () => {
                  return ` `;
                })
              : undefined
          }
          tabIndex={0}
          {...textareaProps}
        />
      </div>
    );
  }
);

Textarea.displayName = `Textarea`;

export default Textarea;
