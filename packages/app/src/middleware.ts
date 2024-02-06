import { getSessionCookieName } from '@/domain/user/common';
import ms from 'ms';
import { NextRequest, NextResponse } from 'next/server';

export default async (request: NextRequest): Promise<NextResponse> => {
  const sessionCookieName = getSessionCookieName();

  const sessionId =
    request.cookies.get(sessionCookieName)?.value || crypto.randomUUID();

  request.cookies.set({
    name: sessionCookieName,
    value: sessionId,
  });

  const response = NextResponse.next();

  response.cookies.set({
    expires: new Date(Date.now() + ms(`10 years`)),
    httpOnly: true,
    name: sessionCookieName,
    sameSite: `lax`,
    secure: true,
    value: sessionId,
  });

  return response;
};
