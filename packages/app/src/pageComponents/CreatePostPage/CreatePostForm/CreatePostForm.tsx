import { SessionUser } from '@/domain/user/server';

import createPostFormAction from './createPostFormAction';
import CreatePostFormInner from './CreatePostFormInner';

type Props = {
  sessionUser: SessionUser;
};

const CreatePostForm = async ({
  sessionUser,
}: Props): Promise<React.ReactElement> => {
  return (
    <form
      action={createPostFormAction.bind(null, sessionUser)}
      className="flex h-full sm:mt-10 sm:h-1/2">
      <CreatePostFormInner sessionUser={sessionUser} />
    </form>
  );
};

export default CreatePostForm;
