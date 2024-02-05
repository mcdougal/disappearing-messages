import { makeRoute } from './utils';

export type ReadPostPageRouteParams = {
  postId: string;
};

export type ReadPostPageRouteSearchParams = Record<string, never>;

export default makeRoute<ReadPostPageRouteParams>({
  path: (params): string => {
    return `/post/${params.postId}`;
  },
});
