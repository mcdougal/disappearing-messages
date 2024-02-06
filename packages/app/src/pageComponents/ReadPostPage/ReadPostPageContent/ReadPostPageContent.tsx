'use client';

import { Post } from '@/domain/post/server';
import { SessionUser } from '@/domain/user/server';

import { PageBackBehavior } from '@/app/pageUtils';
import { useRestoreScrollPosition } from '@/app/scrollRestore';

import Comments from './Comments';
import Header from './Header';
import OriginalPost from './OriginalPost';
import use404Timer from './use404Timer';
import useOptimisticPost from './useOptimisticPost';

type Props = {
  backBehavior: PageBackBehavior;
  post: Post;
  serverRenderedAt: Date;
  sessionUser: SessionUser;
};

const ReadPostPageContent = ({
  backBehavior,
  post,
  serverRenderedAt,
  sessionUser,
}: Props): React.ReactElement => {
  const [optimisticPost, updateOptimisticPost] = useOptimisticPost(post);

  use404Timer(optimisticPost);
  useRestoreScrollPosition({ behavior: `smooth` });

  return (
    <>
      <Header
        backBehavior={backBehavior}
        post={optimisticPost}
        serverRenderedAt={serverRenderedAt}
      />
      <div className="mx-auto max-w-2xl pb-40">
        <OriginalPost
          post={optimisticPost}
          serverRenderedAt={serverRenderedAt}
          sessionUser={sessionUser}
          updateOptimisticPost={updateOptimisticPost}
        />
        <Comments post={optimisticPost} />
      </div>
    </>
  );
};

export default ReadPostPageContent;
