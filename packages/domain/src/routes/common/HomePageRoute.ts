import { makeRoute } from './utils';

export type HomePageRouteParams = Record<string, never>;

export type HomePageRouteSearchParams = Record<string, never>;

export default makeRoute<HomePageRouteParams>({
  path: (): string => {
    return `/`;
  },
});
