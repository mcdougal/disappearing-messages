import { makeRoute } from './utils';

export type ReadPostPageRouteData = {
  postId: string;
};

export default makeRoute<ReadPostPageRouteData>({
  path: (data): string => {
    return `/post/${data.postId}`;
  },
});
