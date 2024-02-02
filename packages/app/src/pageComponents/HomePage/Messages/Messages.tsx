'use client';

import { QueryMessagesFeedMessage } from '@/domain/messages';

import AddForm from './AddForm';
import Message from './Message';

type Props = {
  messages: Array<QueryMessagesFeedMessage>;
};

const Messages = ({ messages }: Props): React.ReactElement => {
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
