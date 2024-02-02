import { Channel, useChannel } from '@/integrations/pusherClient';

import { getPublicChannelName } from '@/domain/realtimeCommon';

export default (): Channel | null => {
  return useChannel(getPublicChannelName());
};
