import { PostsFeedPost } from '@/domain/post/server';
import Linkify from 'linkify-react';

import TextLink from '../TextLink';

type Props = {
  comment: PostsFeedPost['comments'][number];
};

const CommentContent = ({ comment }: Props): React.ReactElement => {
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
      {comment.text}
    </Linkify>
  );
};

export default CommentContent;
