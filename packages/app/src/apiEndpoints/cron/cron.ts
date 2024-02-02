import { createFakeMessage } from '@/jobs/handlers';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { getRequiredEnvVar } from '@/app/envServer';

import { RouteHandler } from '../types';
import { log } from '../utils';

const CRON_SECRET = getRequiredEnvVar(`CRON_SECRET`);

type RouteParams = {
  jobName: string;
};

type ResponseData = {
  success: true;
};

export const POST: RouteHandler<RouteParams, ResponseData> = async (
  request,
  { params }
) => {
  const headersList = headers();
  const authHeader = headersList.get(`authorization`);

  log(
    `headersList: ${JSON.stringify(Array.from(headersList.entries()), null, 2)}`
  );
  log(`authHeader: ${authHeader}`);

  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return new NextResponse(`Unauthorized`, { status: 401 });
  }

  const { jobName } = params;

  if (jobName === `createFakeMessage`) {
    await createFakeMessage();
  } else {
    return new NextResponse(`Job ${jobName} not found`, { status: 404 });
  }

  return NextResponse.json({ success: true });
};
