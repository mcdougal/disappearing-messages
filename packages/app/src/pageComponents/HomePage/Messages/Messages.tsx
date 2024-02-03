'use client';

import { User } from '@/domain/messagesCommon';
import { MessagesFeedMessage } from '@/domain/messagesServer';

import AddForm from './AddForm';
import Message from './Message';
import useLiveUpdatingMessages from './useLiveUpdatingMessages';
import useOptimisticMessages from './useOptimisticMessages';

type Props = {
  messages: Array<MessagesFeedMessage>;
  serverRenderedAt: Date;
  user: User;
};

const Messages = ({
  messages: initialMessages,
  serverRenderedAt,
  user,
}: Props): React.ReactElement => {
  const messages = useLiveUpdatingMessages(initialMessages);
  const [optimisticMessages, addOptimisticMessage] =
    useOptimisticMessages(messages);

  return (
    <div>
      <div className="mb-16">
        <AddForm addOptimisticMessage={addOptimisticMessage} user={user} />
      </div>
      <div className="flex flex-col gap-3">
        {optimisticMessages.map((message) => {
          return (
            <Message
              key={message.id}
              message={message}
              serverRenderedAt={serverRenderedAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
