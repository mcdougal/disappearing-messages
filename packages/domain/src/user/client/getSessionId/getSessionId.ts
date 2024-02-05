import { headers } from 'next/headers';
import { parse } from 'set-cookie-parser';

import { getSessionCookieName } from '@/domain/user/common';

export default (): string => {
  // Can't use `cookies()` because we set the session ID from middleware
  // See: https://github.com/vercel/next.js/discussions/50374
  const setCookieHeader = headers().get(`set-cookie`);

  if (!setCookieHeader) {
    throw new Error(`No set-cookie header found`);
  }

  const parsedCookies = parse(setCookieHeader);

  const sessionCookie = parsedCookies.find((cookie) => {
    return cookie.name === getSessionCookieName();
  });

  if (!sessionCookie || !sessionCookie.value) {
    throw new Error(`No session cookie found`);
  }

  return sessionCookie.value;
};
