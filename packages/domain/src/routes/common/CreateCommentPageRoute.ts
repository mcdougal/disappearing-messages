import { addSearchParams, makeRoute } from './utils';

export type CreateCommentPageRouteParams = {
  postId: string;
};

export type CreateCommentPageRouteSearchParams = {
  replyTo?: string;
};

export default makeRoute<
  CreateCommentPageRouteParams,
  CreateCommentPageRouteSearchParams
>({
  path: ({ params, searchParams }): string => {
    return addSearchParams(`/post/${params.postId}/comment`, {
      replyTo: searchParams.replyTo,
    });
  },
});
