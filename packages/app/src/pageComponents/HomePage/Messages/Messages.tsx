import { queryMessagesFeed } from '@/domain/messages';

import AddForm from './AddForm';
import Message from './Message';

const Messages = async (): Promise<React.ReactElement> => {
  const messages = await queryMessagesFeed();

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
