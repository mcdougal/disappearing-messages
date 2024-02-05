import { ParsedUrlQuery } from 'querystring';

export type Router = {
  query: ParsedUrlQuery;
};

type RouteDefinition<T> = {
  /**
   * Build a link to this page in the app.
   */
  path: (data: T) => string;
};

export type Route<T> = {
  /**
   * Build a link to this page in the app.
   */
  getPath: (data: T) => string;
};

export default <T = Record<string, never>>(
  routeDefinition: RouteDefinition<T>
): Route<T> => {
  const getPath = (data: T): string => {
    return routeDefinition.path(data);
  };

  const route = {
    getPath,
  };

  return route;
};
