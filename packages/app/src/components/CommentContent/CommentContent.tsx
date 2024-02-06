import { Post } from '@/domain/post/server';
import Linkify from 'linkify-react';

import TextLink from '../TextLink';

type Props = {
  comment: Post['comments'][number];
};

const CommentContent = ({ comment }: Props): React.ReactElement => {
  return (
    <Linkify
      as="p"
      className="md:text-md whitespace-pre-wrap break-words text-sm"
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
      {comment.replyingTo && (
        <span className="mr-1 inline-block bg-blue-50">
          @{comment.replyingTo.author.name}
        </span>
      )}
      {comment.text}
    </Linkify>
  );
};

export default CommentContent;
