import { PostsFeedPost } from '@/domain/post/server';

export default (post: PostsFeedPost): string => {
  return JSON.stringify({
    authorAvatarSrc: post.author.avatarSrc,
    authorName: post.author.name,
    postedAt: post.postedAt.getTime(),
    text: post.text,
  });
};
