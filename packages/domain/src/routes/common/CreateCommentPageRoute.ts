import { addSearchParams, makeRoute } from './utils';

export type CreateCommentPageRouteParams = {
  postId: string;
};

export type CreateCommentPageRouteSearchParams = {
  message?: string;
};

export default makeRoute<
  CreateCommentPageRouteParams,
  CreateCommentPageRouteSearchParams
>({
  path: ({ params, searchParams }): string => {
    return addSearchParams(`/post/${params.postId}/comment`, {
      message: searchParams.message,
    });
  },
});
