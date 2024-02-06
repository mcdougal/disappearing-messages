import { getSessionStorageKey } from '../utils';

export default (path: string): void => {
  const key = getSessionStorageKey();
  const positions = JSON.parse(sessionStorage.getItem(key) || `{}`);

  delete positions[path];

  sessionStorage.setItem(key, JSON.stringify(positions));
};
