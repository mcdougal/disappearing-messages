'use client';

import { QueryMessagesFeedMessage } from '@/domain/messages';

import AddForm from './AddForm';
import Message from './Message';
import useLiveUpdatingMessages from './useLiveUpdatingMessages';

type Props = {
  messages: Array<QueryMessagesFeedMessage>;
};

const Messages = ({ messages: initialMessages }: Props): React.ReactElement => {
  const messages = useLiveUpdatingMessages(initialMessages);

  return (
    <div>
      <div className="mb-16">
        <AddForm />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
    </div>
  );
};

export default Messages;
