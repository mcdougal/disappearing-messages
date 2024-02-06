import { getExpirationDurationString } from '@/domain/post/common';
import { HomePageRoute } from '@/domain/routes/common';
import { getOrCreateUserForSession } from '@/domain/user/server';

import { GenerateMetadata, Page, getPageBackBehavior } from '@/app/pageUtils';
import { getSessionId } from '@/app/session';

import CreatePostForm from './CreatePostForm';

export const dynamic = `force-dynamic`;

export const generateMetadata: GenerateMetadata = async () => {
  return {
    title: `Post - disappearing.chat`,
    description: `Your post will disappear after ${getExpirationDurationString()}. Upvotes and comments reset the clock.`,
  };
};

const CreatePostPage: Page = async () => {
  const sessionId = getSessionId();
  const sessionUser = await getOrCreateUserForSession({ where: { sessionId } });
  const backBehavior = getPageBackBehavior(HomePageRoute.getPath({}));

  return (
    <CreatePostForm backBehavior={backBehavior} sessionUser={sessionUser} />
  );
};

export default CreatePostPage;
