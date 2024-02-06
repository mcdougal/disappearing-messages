import { useEffect } from 'react';

import clearScrollPosition from '../clearScrollPosition';
import { getSessionStorageKey } from '../utils';

type Args = {
  behavior: `auto` | `instant` | `smooth`;
};

export default (args?: Args): void => {
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    const pathname = window.location.pathname;
    const key = getSessionStorageKey();
    const positions = JSON.parse(sessionStorage.getItem(key) || `{}`);
    const position = positions[pathname];

    if (window.scrollY === 0 && position) {
      window.scrollTo({
        left: 0,
        top: position,
        behavior: args?.behavior,
      });

      timeout = setTimeout(() => {
        clearScrollPosition(pathname);
      }, 1000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [args?.behavior]);
};
