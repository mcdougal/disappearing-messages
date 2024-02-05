import { makeRoute } from './utils';

export type CreateCommentPageRouteParams = {
  postId: string;
};

export type CreateCommentPageRouteSearchParams = Record<string, never>;

export default makeRoute<CreateCommentPageRouteParams>({
  path: (params): string => {
    return `/post/${params.postId}/comment`;
  },
});
