import Linkify from 'linkify-react';

import { TextLink } from '@/app/components';

type Props = {
  text: string;
};

const PostContent = ({ text }: Props): React.ReactElement => {
  return (
    <Linkify
      as="p"
      className="md:text-md overflow-hidden whitespace-pre break-words text-sm"
      options={{
        defaultProtocol: `https`,
        target: `_blank`,
        render: ({ attributes, content }) => {
          const { href, ...props } = attributes;
          return (
            <TextLink href={href} {...props}>
              {content}
            </TextLink>
          );
        },
      }}>
      {text}
    </Linkify>
  );
};

export default PostContent;
