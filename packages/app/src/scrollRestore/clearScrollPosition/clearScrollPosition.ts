import { getLocalStorageKey } from '../utils';

export default (path: string): void => {
  const key = getLocalStorageKey();
  const positions = JSON.parse(localStorage.getItem(key) || `{}`);

  delete positions[path];

  localStorage.setItem(key, JSON.stringify(positions));
};
