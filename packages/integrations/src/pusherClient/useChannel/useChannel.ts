import { Channel } from 'pusher-js';
import { useEffect, useRef, useState } from 'react';

import { getGlobalPusher } from '../utils';

export default (channelName: string): Channel | null => {
  const called = useRef(false);
  const [channel, setChannel] = useState<Channel | null>(null);

  useEffect(() => {
    if (called.current) {
      return;
    }

    called.current = true;

    const pusher = getGlobalPusher();
    const publicChannel = pusher.subscribe(channelName);

    setChannel(publicChannel);
  }, [channelName]);

  return channel;
};
