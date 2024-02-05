import { getSessionCookieName } from '@/domain/user/common';
import { headers } from 'next/headers';
import { parse } from 'set-cookie-parser';

export default (): string | null => {
  // Can't use `cookies()` because we set the session ID from middleware
  // See: https://github.com/vercel/next.js/discussions/50374
  const setCookieHeader = headers().get(`set-cookie`);

  if (!setCookieHeader) {
    return null;
  }

  const parsedCookies = parse(setCookieHeader);

  const sessionCookie = parsedCookies.find((cookie) => {
    return cookie.name === getSessionCookieName();
  });

  return sessionCookie?.value || null;
};
