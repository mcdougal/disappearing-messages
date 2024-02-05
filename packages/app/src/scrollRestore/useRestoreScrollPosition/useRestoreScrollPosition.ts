import { useEffect } from 'react';

import { getLocalStorageKey } from '../utils';

export default (): void => {
  useEffect(() => {
    const key = getLocalStorageKey();
    const positions = JSON.parse(localStorage.getItem(key) || `{}`);
    const position = positions[window.location.pathname];

    if (window.scrollY === 0 && position) {
      window.scrollTo(0, position);
    }
  }, []);
};
