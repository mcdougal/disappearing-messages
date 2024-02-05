import { HomePageRoute } from '@/domain/routes/common';
import { getSessionId } from '@/domain/user/client';
import { getOrCreateUserForSession } from '@/domain/user/server';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

import { Container } from '@/app/components';

import CreatePostForm from './CreatePostForm';

const CreatePostPage = async (): Promise<React.ReactElement> => {
  const sessionId = getSessionId();
  const sessionUser = await getOrCreateUserForSession({ where: { sessionId } });

  return (
    <>
      <Container className="h-screen" size="sm">
        <CreatePostForm sessionUser={sessionUser} />
      </Container>
      <Link
        aria-label="Close"
        className="absolute right-4 top-5 -mt-1 rounded-full p-2 hover:bg-gray-200 sm:right-6 sm:top-7 sm:-mr-1 sm:-mt-3"
        href={HomePageRoute.getPath({})}>
        <XMarkIcon className="h-5 w-5" />
      </Link>
    </>
  );
};

export default CreatePostPage;
