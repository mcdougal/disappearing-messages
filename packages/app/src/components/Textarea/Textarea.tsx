import classNames from 'classnames';

import Button, { ButtonIcon } from '../Button';

type Props = Readonly<{
  autoFocus?: boolean;
  error?: boolean;
  helperText?: string;
  id: string;
  name: string;
  placeholder?: string;
  submit?: { label: string; icon?: ButtonIcon };
}>;

const Textarea = ({
  autoFocus,
  error,
  helperText,
  id,
  name,
  placeholder,
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
          className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          defaultValue=""
          id={id}
          name={name}
          placeholder={placeholder}
          rows={3}
        />
        {submit && (
          <div className="flex justify-end py-2 pl-3 pr-2">
            <div className="flex-shrink-0">
              <Button endIcon={submit.icon} size="sm" type="submit">
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
