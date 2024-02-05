import { ReadPostPageRoute } from '@/domain/routes/common';
import { headers } from 'next/headers';

import { ExitBehavior } from './types';

export default (postId: string): ExitBehavior => {
  const referrer = headers().get(`referer`);
  const referrerPath = referrer ? new URL(referrer).pathname : null;
  const readPostPagePath = ReadPostPageRoute.getPath({ postId });

  console.log(`-------------------------`);
  console.log(`referrer:`, referrer);
  console.log(`referrerPath:`, referrerPath);
  console.log(`readPostPagePath:`, readPostPagePath);
  console.log(
    referrerPath === readPostPagePath
      ? { action: `back` }
      : { action: `navigate`, path: readPostPagePath }
  );
  console.log(`-------------------------`);

  return referrerPath === readPostPagePath
    ? { action: `back` }
    : { action: `navigate`, path: readPostPagePath };
};
