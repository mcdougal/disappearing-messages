import { NextRequest, NextResponse } from 'next/server';

export type RouteHandler<P, R> = (
  request: NextRequest,
  params: { params: P }
) => Promise<NextResponse<R>>;
