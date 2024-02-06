export type Post = {
  id: string;
  author: { avatarSrc: string; name: string };
  comments: Array<{ id: string }>;
  upvotes: Array<{ userId: string }>;
};

export type OptimisticUpvote = {
  expiresAt: Date;
  postId: string;
  updatedAt: Date;
  userId: string;
};
