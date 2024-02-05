import { getLocalStorageKey } from '../utils';

export default (): void => {
  const key = getLocalStorageKey();
  const positions = JSON.parse(localStorage.getItem(key) || `{}`);

  positions[window.location.pathname] = window.scrollY;

  localStorage.setItem(key, JSON.stringify(positions));
};
