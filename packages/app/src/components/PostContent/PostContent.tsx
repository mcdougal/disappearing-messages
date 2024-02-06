import { PostsFeedPost } from '@/domain/post/server';
import Linkify from 'linkify-react';
import { twMerge } from 'tailwind-merge';

import TextLink from '../TextLink';

type Props = {
  className?: string;
  post: PostsFeedPost;
};

const PostContent = ({ className, post }: Props): React.ReactElement => {
  return (
    <Linkify
      as="p"
      className={twMerge(
        `md:text-md whitespace-pre-wrap break-words text-sm`,
        className
      )}
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
      {post.text}
    </Linkify>
  );
};

export default PostContent;
