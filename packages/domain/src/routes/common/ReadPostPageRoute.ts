import { makeRoute } from './utils';

export type ReadPostPageRouteParams = {
  postId: string;
};

export type ReadPostPageRouteSearchParams = Record<string, never>;

export default makeRoute<ReadPostPageRouteParams>({
  path: (data): string => {
    return `/post/${data.postId}`;
  },
});
