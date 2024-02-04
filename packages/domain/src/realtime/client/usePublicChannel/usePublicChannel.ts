import 'client-only';

import { Channel, useChannel } from '@/integrations/pusherClient';

import { getPublicChannelName } from '@/domain/realtime/common';

export default (): Channel | null => {
  return useChannel(getPublicChannelName());
};
