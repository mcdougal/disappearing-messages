import { makeRoute } from './utils';

export type AdminComponentsRouteParams = Record<string, never>;

export type AdminComponentsRouteSearchParams = Record<string, never>;

export default makeRoute<AdminComponentsRouteParams>({
  path: (): string => {
    return `/admin/components`;
  },
});
