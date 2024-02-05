import { ParsedUrlQuery } from 'querystring';

export type Router = {
  query: ParsedUrlQuery;
};

type RouteDefinition<T> = {
  /**
   * Build a link to this page in the app.
   */
  path: (params: T) => string;
};

export type Route<T> = {
  /**
   * Build a link to this page in the app.
   */
  getPath: (params: T) => string;
};

export default <Params = Record<string, never>>(
  routeDefinition: RouteDefinition<Params>
): Route<Params> => {
  const getPath = (params: Params): string => {
    return routeDefinition.path(params);
  };

  const route = {
    getPath,
  };

  return route;
};
