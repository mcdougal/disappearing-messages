import { queryPostsFeed } from '@/domain/post/server';
import { getOrCreateUserForSession } from '@/domain/user/server';

import { Page } from '@/app/pageUtils';
import { getSessionId } from '@/app/session';

import DeletionWarning from './DeletionWarning';
import Footer from './Footer';
import Header from './Header';
import Posts from './Posts';

export const dynamic = `force-dynamic`;

const HomePage: Page = async () => {
  const sessionId = getSessionId();
  const sessionUser = await getOrCreateUserForSession({ where: { sessionId } });
  const posts = await queryPostsFeed();
  const serverRenderedAt = new Date();

  return (
    <>
      <Header />
      <div className="mx-auto max-w-2xl pb-40">
        <DeletionWarning />
        <Posts
          posts={posts}
          serverRenderedAt={serverRenderedAt}
          sessionUser={sessionUser}
        />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
