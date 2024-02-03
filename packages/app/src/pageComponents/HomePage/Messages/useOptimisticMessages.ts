import { QueryMessagesFeedMessage } from '@/domain/messagesServer';
import { useOptimistic } from 'react';

import { addMessage } from './utils';

export default (
  messages: Array<QueryMessagesFeedMessage>
): [
  Array<QueryMessagesFeedMessage>,
  (message: QueryMessagesFeedMessage) => void,
] => {
  return useOptimistic<
    Array<QueryMessagesFeedMessage>,
    QueryMessagesFeedMessage
  >(messages, (currentState, optimisticValue) => {
    return addMessage(optimisticValue, currentState);
  });
};
