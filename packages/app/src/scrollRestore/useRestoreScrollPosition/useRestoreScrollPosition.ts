import { useEffect } from 'react';

import { getSessionStorageKey } from '../utils';

type Args = {
  behavior: `auto` | `instant` | `smooth`;
};

export default (args?: Args): void => {
  useEffect(() => {
    const key = getSessionStorageKey();
    const positions = JSON.parse(sessionStorage.getItem(key) || `{}`);
    const position = positions[window.location.pathname];

    if (window.scrollY === 0 && position) {
      window.scrollTo({
        left: 0,
        top: position,
        behavior: args?.behavior,
      });
    }
  }, [args?.behavior]);
};
