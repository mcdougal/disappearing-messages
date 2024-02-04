import { getRequiredEnvVar } from '@/common/env';

// Prevent events triggered from one environment from impacting
// other environments
const namespace = getRequiredEnvVar(`NEXT_PUBLIC_PUSHER_CHANNEL_NAMESPACE`);

export default (): string => {
  return `public-channel--${namespace}`;
};
