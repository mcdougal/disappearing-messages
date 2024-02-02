import { getRequiredEnvVar } from '@/common/env';
import Pusher from 'pusher-js';

let globalPusher: Pusher | null;

export default (): Pusher => {
  if (!globalPusher) {
    globalPusher = new Pusher(getRequiredEnvVar(`NEXT_PUBLIC_PUSHER_KEY`), {
      cluster: getRequiredEnvVar(`NEXT_PUBLIC_PUSHER_CLUSTER`),
      forceTLS: true,
    });
  }

  return globalPusher;
};
