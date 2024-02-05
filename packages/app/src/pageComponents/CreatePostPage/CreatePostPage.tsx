import { getExpirationDurationString } from '@/domain/post/common';
import { GenerateMetadata, Page } from '@/domain/routes/client';
import {
  CreatePostPageRouteParams,
  CreatePostPageRouteSearchParams,
} from '@/domain/routes/common';
import { getSessionId } from '@/domain/user/client';
import { getOrCreateUserForSession } from '@/domain/user/server';

import { Container } from '@/app/components';

import CloseButton from './CloseButton';
import CreatePostForm from './CreatePostForm';

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
      <Container className="h-screen sm:pt-36" size="sm">
        <CreatePostForm sessionUser={sessionUser} />
      </Container>
      <CloseButton />
    </>
  );
};

export default CreatePostPage;
