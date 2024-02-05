'use client';

import { PostsFeedPost } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';

import { TextLink, Typography } from '@/app/components';
import { useRestoreScrollPosition } from '@/app/scrollRestore';

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

  useRestoreScrollPosition();

  return (
    <>
      <Header />
      <div className="mx-auto max-w-2xl pb-40">
        <Description />
        <Posts
          posts={optimisticPosts}
          serverRenderedAt={serverRenderedAt}
          sessionUser={sessionUser}
          upsertOptimisticPost={upsertOptimisticPost}
        />
      </div>
      <div className="px-4 pb-4 pt-10">
        <Typography color="gray" size="xs">
          Avatars by{` `}
          <TextLink
            href="https://www.freepik.com/free-vector/animal-avatars-flat-design_772910.htm#query=animal%20avatars&position=1&from_view=keyword&track=ais&uuid=90657734-77ac-4a0b-87ed-40823d02fdff"
            target="_blank">
            Freepik
          </TextLink>
        </Typography>
      </div>
    </>
  );
};

export default HomePageContent;
