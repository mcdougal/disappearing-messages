import { MessagesFeedMessage } from '@/domain/messagesServer';
import { useOptimistic } from 'react';

import { addMessage } from './utils';

export default (
  messages: Array<MessagesFeedMessage>
): [Array<MessagesFeedMessage>, (message: MessagesFeedMessage) => void] => {
  return useOptimistic<Array<MessagesFeedMessage>, MessagesFeedMessage>(
    messages,
    (currentState, optimisticValue) => {
      return addMessage(optimisticValue, currentState);
    }
  );
};
