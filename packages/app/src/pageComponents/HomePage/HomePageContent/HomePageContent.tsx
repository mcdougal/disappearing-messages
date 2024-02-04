'use client';

import { PostsFeedPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';

import Description from './Description';
import Header from './Header';
import Posts from './Posts';
import useOptimisticPosts from './useOptimisticPosts';

export const dynamic = `force-dynamic`;

type Props = {
  posts: Array<PostsFeedPost>;
  serverRenderedAt: Date;
  sessionUser: SessionUser;
};

const HomePageContent = ({
  posts,
  serverRenderedAt,
  sessionUser,
}: Props): React.ReactElement => {
  const [optimisticPosts, upsertOptimisticPost] = useOptimisticPosts(posts);

  return (
    <>
      <Header
        sessionUser={sessionUser}
        upsertOptimisticPost={upsertOptimisticPost}
      />
      <div className="mx-auto max-w-4xl pb-40">
        <Description />
        <Posts
          posts={optimisticPosts}
          serverRenderedAt={serverRenderedAt}
          sessionUser={sessionUser}
          upsertOptimisticPost={upsertOptimisticPost}
        />
      </div>
    </>
  );
};

export default HomePageContent;
