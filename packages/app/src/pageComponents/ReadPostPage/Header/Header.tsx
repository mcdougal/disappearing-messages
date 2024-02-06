import { Post } from '@/domain/post/server';
import { CreateCommentPageRoute } from '@/domain/routes/common';

import { BackButton, Button } from '@/app/components';
import { PageBackBehavior } from '@/app/pageUtils';

type Props = {
  backBehavior: PageBackBehavior;
  post: Post;
};

const Header = ({ backBehavior, post }: Props): React.ReactElement => {
  return (
    <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-3 py-3">
        <BackButton backBehavior={backBehavior} icon="back" />
        <Button
          as="a"
          className="min-w-20"
          color="secondary"
          href={CreateCommentPageRoute.getPath({
            params: { postId: post.id },
            searchParams: {},
          })}
          size="md"
          type="submit">
          Comment
        </Button>
      </div>
    </div>
  );
};

export default Header;
