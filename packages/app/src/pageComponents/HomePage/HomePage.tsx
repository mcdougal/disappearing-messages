import { queryPostsFeed } from '@/domain/post/server';
import {
  HomePageRouteParams,
  HomePageRouteSearchParams,
} from '@/domain/routes/common';
import { getOrCreateUserForSession } from '@/domain/user/server';

import { Page } from '@/app/pageUtils';
import { getSessionId } from '@/app/session';

import HomePageContent from './HomePageContent';

export const dynamic = `force-dynamic`;

const HomePage: Page<
  HomePageRouteParams,
  HomePageRouteSearchParams
> = async () => {
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
