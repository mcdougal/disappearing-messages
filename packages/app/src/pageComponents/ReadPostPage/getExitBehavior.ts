import { HomePageRoute } from '@/domain/routes/common';
import { headers } from 'next/headers';

import { ExitBehavior } from './types';

export default (): ExitBehavior => {
  const referrer = headers().get(`referer`);
  const referrerPath = referrer ? new URL(referrer).pathname : null;
  const homePagePath = HomePageRoute.getPath({});

  return referrerPath === homePagePath
    ? { action: `back` }
    : { action: `navigate`, path: homePagePath };
};
