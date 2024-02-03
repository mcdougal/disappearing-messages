'use client';

import { User } from '@/domain/messagesCommon';
import { MessagesFeedMessage } from '@/domain/messagesServer';

import AddForm from './AddForm';
import Message from './Message';
import useLiveUpdatingMessages from './useLiveUpdatingMessages';
import useOptimisticMessages from './useOptimisticMessages';
import { getMessageKey } from './utils';

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
  const [optimisticMessages, upsertOptimisticMessage] =
    useOptimisticMessages(messages);

  return (
    <div>
      <div className="mb-16">
        <AddForm
          upsertOptimisticMessage={upsertOptimisticMessage}
          user={user}
        />
      </div>
      <div className="flex flex-col gap-3">
        {optimisticMessages.map((message) => {
          return (
            <Message
              key={getMessageKey(message)}
              message={message}
              serverRenderedAt={serverRenderedAt}
              upsertOptimisticMessage={upsertOptimisticMessage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
