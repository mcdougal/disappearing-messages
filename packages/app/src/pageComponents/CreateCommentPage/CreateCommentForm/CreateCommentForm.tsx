import { SessionUser } from '@/domain/user/server';

import createCommentFormAction from './createCommentFormAction';
import CreateCommentFormInner from './CreateCommentFormInner';

type Props = {
  postId: string;
  sessionUser: SessionUser;
};

const CreateCommentForm = async ({
  postId,
  sessionUser,
}: Props): Promise<React.ReactElement> => {
  return (
    <form
      action={createCommentFormAction.bind(null, sessionUser, postId)}
      className="flex h-full sm:h-96">
      <CreateCommentFormInner sessionUser={sessionUser} />
    </form>
  );
};

export default CreateCommentForm;
