import { makeRoute } from './utils';

export type CreatePostPageRouteData = Record<string, never>;

export default makeRoute<CreatePostPageRouteData>({
  path: (): string => {
    return `/post`;
  },
});
