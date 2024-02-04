import classNames from 'classnames';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const TextLink = ({
  children,
  className,
  ...otherProps
}: Props): React.ReactElement => {
  return (
    <a
      className={classNames(
        `text-blue-600 underline visited:text-purple-600 hover:text-blue-800`,
        className
      )}
      {...otherProps}>
      {children}
    </a>
  );
};

export default TextLink;
