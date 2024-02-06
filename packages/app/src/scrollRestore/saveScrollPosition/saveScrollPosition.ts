import { getSessionStorageKey } from '../utils';

export default (path?: string, scrollPosition?: number): void => {
  const key = getSessionStorageKey();
  const positions = JSON.parse(sessionStorage.getItem(key) || `{}`);

  positions[path || window.location.pathname] =
    scrollPosition ?? window.scrollY;

  sessionStorage.setItem(key, JSON.stringify(positions));
};
