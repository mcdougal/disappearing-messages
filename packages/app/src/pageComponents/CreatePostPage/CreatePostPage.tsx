import { getSessionId } from '@/domain/user/client';
import { getOrCreateUserForSession } from '@/domain/user/server';

import { Container } from '@/app/components';

import CloseButton from './CloseButton';
import CreatePostForm from './CreatePostForm';

const CreatePostPage = async (): Promise<React.ReactElement> => {
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
