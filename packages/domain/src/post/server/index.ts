import createPost from './createPost';
import queryPost, { Post } from './queryPost';
import queryPostsFeed, { PostsFeedPost } from './queryPostsFeed';
import upvotePost from './upvotePost';

export type { Post, PostsFeedPost };

export { createPost, queryPost, queryPostsFeed, upvotePost };
