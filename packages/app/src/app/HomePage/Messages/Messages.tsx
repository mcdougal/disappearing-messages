import AddForm from './AddForm';
import Message from './Message';
import queryMessages from './queryMessages';

const Messages = async (): Promise<React.ReactElement> => {
  const messages = await queryMessages();

  return (
    <div>
      <div className="mb-16">
        <AddForm />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        {messages.map((message) => {
          return <Message key={message.id} message={message} />;
        })}
      </div>
    </div>
  );
};

export default Messages;
