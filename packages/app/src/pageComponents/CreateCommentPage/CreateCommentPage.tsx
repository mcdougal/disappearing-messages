import { queryPost } from '@/domain/post/server';
import {
  CreateCommentPageRouteParams,
  CreateCommentPageRouteSearchParams,
  ReadPostPageRoute,
} from '@/domain/routes/common';
import { getOrCreateUserForSession } from '@/domain/user/server';

import { BackButton, Container } from '@/app/components';
import { GenerateMetadata, Page, getPageBackBehavior } from '@/app/pageUtils';
import { getSessionId } from '@/app/session';

import CreateCommentForm from './CreateCommentForm';

export const dynamic = `force-dynamic`;

export const generateMetadata: GenerateMetadata<
  CreateCommentPageRouteParams,
  CreateCommentPageRouteSearchParams
> = async ({ params }) => {
  const post = await queryPost({ where: { id: params.postId } });

  return {
    title: `Leave a Comment - disappearing.chat`,
    description: `Post: ${post?.text || `Not Found`}`,
  };
};

const CreateCommentPage: Page<
  CreateCommentPageRouteParams,
  CreateCommentPageRouteSearchParams
> = async ({ params }) => {
  const { postId } = params;
  const sessionId = getSessionId();
  const sessionUser = await getOrCreateUserForSession({ where: { sessionId } });
  const backBehavior = getPageBackBehavior(
    ReadPostPageRoute.getPath({ postId })
  );

  return (
    <>
      <Container className="sm:pt-36" size="xs">
        <CreateCommentForm postId={postId} sessionUser={sessionUser} />
      </Container>
      <BackButton backBehavior={backBehavior} icon="close" />
    </>
  );
};

export default CreateCommentPage;
