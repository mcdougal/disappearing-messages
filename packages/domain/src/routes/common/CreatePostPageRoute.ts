import { makeRoute } from './utils';

export type CreatePostPageRouteParams = Record<string, never>;

export type CreatePostPageRouteSearchParams = Record<string, never>;

export default makeRoute<CreatePostPageRouteParams>({
  path: (): string => {
    return `/post`;
  },
});
