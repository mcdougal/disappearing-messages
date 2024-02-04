import { queryPostsFeed } from '@/domain/post/server';
import { getOrCreateUserForSession } from '@/domain/user/server';
import { cookies } from 'next/headers';

import HomePageContent from './HomePageContent';

const HomePage = async (): Promise<React.ReactElement> => {
  const sessionId = cookies().get(`s`)?.value;

  if (!sessionId) {
    throw new Error(`No session id`);
  }

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
