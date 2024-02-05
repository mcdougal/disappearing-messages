import { getSessionCookieName } from '@/domain/user/common';
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
    httpOnly: true,
    name: sessionCookieName,
    secure: true,
    value: sessionId,
  });

  return response;
};
