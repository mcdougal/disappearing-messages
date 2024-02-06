import { useEffect } from 'react';

import { getSessionStorageKey } from '../utils';

export default (): void => {
  useEffect(() => {
    const key = getSessionStorageKey();
    const positions = JSON.parse(sessionStorage.getItem(key) || `{}`);
    const position = positions[window.location.pathname];

    if (window.scrollY === 0 && position) {
      window.scrollTo(0, position);
    }
  }, []);
};
