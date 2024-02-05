import { queryPostsFeed } from '@/domain/post/server';
import { getSessionId } from '@/domain/user/client';
import { getOrCreateUserForSession } from '@/domain/user/server';

import HomePageContent from './HomePageContent';

const HomePage = async (): Promise<React.ReactElement> => {
  const sessionId = getSessionId();
  const sessionUser = await getOrCreateUserForSession({ where: { sessionId } });
  const posts = await queryPostsFeed();
  const serverRenderedAt = new Date();

  return (
    <HomePageContent
      posts={posts}
      serverRenderedAt={serverRenderedAt}
      sessionUser={sessionUser}
    />
  );
};

export default HomePage;
