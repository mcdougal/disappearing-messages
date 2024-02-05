import { makeRoute } from './utils';

export type HomePageRouteData = Record<string, never>;

export default makeRoute<HomePageRouteData>({
  path: (): string => {
    return `/`;
  },
});
