'use client';

import { QueryMessagesFeedMessage } from '@/domain/messagesServer';

import AddForm from './AddForm';
import Message from './Message';
import useLiveUpdatingMessages from './useLiveUpdatingMessages';
import useOptimisticMessages from './useOptimisticMessages';

type Props = {
  messages: Array<QueryMessagesFeedMessage>;
};

const Messages = ({ messages: initialMessages }: Props): React.ReactElement => {
  const messages = useLiveUpdatingMessages(initialMessages);
  const [optimisticMessages, addOptimisticMessage] =
    useOptimisticMessages(messages);

  return (
    <div>
      <div className="mb-16">
        <AddForm addOptimisticMessage={addOptimisticMessage} />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {optimisticMessages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
    </div>
  );
};

export default Messages;
