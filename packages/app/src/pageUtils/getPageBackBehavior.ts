import { headers } from 'next/headers';

import { PageBackBehavior } from './types';

export default (expectedFromPath: string): PageBackBehavior => {
  const referrer = headers().get(`referer`);
  const referrerPath = referrer ? new URL(referrer).pathname : null;

  return referrerPath === expectedFromPath
    ? { action: `back` }
    : { action: `navigate`, path: expectedFromPath };
};
