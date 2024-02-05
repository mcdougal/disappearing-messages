import { getExpirationDurationString } from '@/domain/post/common';
import {
  CreatePostPageRouteParams,
  CreatePostPageRouteSearchParams,
} from '@/domain/routes/common';
import { getOrCreateUserForSession } from '@/domain/user/server';

import { Container } from '@/app/components';
import { GenerateMetadata, Page } from '@/app/pageUtils';
import { getSessionId } from '@/app/session';

import CloseButton from './CloseButton';
import CreatePostForm from './CreatePostForm';

export const dynamic = `force-dynamic`;

export const generateMetadata: GenerateMetadata<
  CreatePostPageRouteParams,
  CreatePostPageRouteSearchParams
> = async () => {
  return {
    title: `Post - disappearing.chat`,
    description: `Your post will disappear after ${getExpirationDurationString()}. Upvotes and comments reset the clock.`,
  };
};

const CreatePostPage: Page<
  CreatePostPageRouteParams,
  CreatePostPageRouteSearchParams
> = async () => {
  const sessionId = getSessionId();
  const sessionUser = await getOrCreateUserForSession({ where: { sessionId } });

  return (
    <>
      <Container className="h-screen sm:pt-36" size="xs">
        <CreatePostForm sessionUser={sessionUser} />
      </Container>
      <CloseButton />
    </>
  );
};

export default CreatePostPage;
