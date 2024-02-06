import { getSessionStorageKey } from '../utils';

export default (): void => {
  const key = getSessionStorageKey();
  const positions = JSON.parse(sessionStorage.getItem(key) || `{}`);

  positions[window.location.pathname] = window.scrollY;

  sessionStorage.setItem(key, JSON.stringify(positions));
};
