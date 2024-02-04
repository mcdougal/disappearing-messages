import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = `s`;

export default async (request: NextRequest): Promise<NextResponse> => {
  const sessionId = request.cookies.get(`s`)?.value || crypto.randomUUID();

  request.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: sessionId,
  });

  const response = NextResponse.next();

  response.cookies.set({
    httpOnly: true,
    name: SESSION_COOKIE_NAME,
    secure: true,
    value: sessionId,
  });

  return response;
};
