import { useEffect } from 'react';

import clearScrollPosition from '../clearScrollPosition';

export default (): void => {
  useEffect(() => {
    const handler = (): void => {
      if (window.scrollY === 0) {
        clearScrollPosition(window.location.pathname);
      }
    };

    window.addEventListener(`scroll`, handler, { passive: true });

    return (): void => {
      window.removeEventListener(`scroll`, handler);
    };
  }, []);
};
