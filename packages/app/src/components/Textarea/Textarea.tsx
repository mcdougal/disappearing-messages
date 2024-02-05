import classNames from 'classnames';

import Button, { ButtonIcon } from '../Button';

type Props = Readonly<{
  autoFocus?: boolean;
  error?: boolean;
  helperText?: string;
  id: string;
  maxLength?: number;
  name: string;
  placeholder?: string;
  rows?: number;
  submit?: { label: string; icon?: ButtonIcon };
}>;

const Textarea = ({
  autoFocus,
  error,
  helperText,
  id,
  maxLength,
  name,
  placeholder,
  rows = 3,
  submit,
}: Props): React.ReactElement => {
  const helperTextId = `${id}-helperText`;

  return (
    <div>
      <div
        className={classNames(
          `flex w-full flex-col overflow-hidden rounded-lg shadow-sm ring-1 ring-inset focus-within:ring-2`,
          error
            ? `ring-red-300 focus:ring-red-500`
            : `ring-gray-300 focus-within:ring-indigo-600`
        )}>
        {placeholder && (
          <label className="sr-only" htmlFor={id}>
            {placeholder}
          </label>
        )}
        <textarea
          aria-describedby={error ? helperTextId : undefined}
          aria-invalid={error}
          autoFocus={autoFocus}
          className="text-md block w-full resize-none border-0 bg-transparent px-4 py-3 leading-6 text-gray-900 placeholder:text-gray-400 focus:ring-0"
          defaultValue=""
          id={id}
          maxLength={maxLength}
          name={name}
          placeholder={placeholder}
          rows={rows}
        />
        {submit && (
          <div className="flex justify-end py-2 pl-3 pr-2">
            <div className="flex-shrink-0">
              <Button endIcon={submit.icon} size="md" type="submit">
                {submit.label}
              </Button>
            </div>
          </div>
        )}
      </div>
      {helperText && (
        <p
          className={classNames(
            `mt-2 text-sm`,
            error ? `text-red-600` : `text-gray-500`
          )}
          id={helperTextId}>
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Textarea;
