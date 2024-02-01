import AddForm from './AddForm';
import queryMessages from './queryMessages';

const Messages = async (): Promise<React.ReactElement> => {
  const messages = await queryMessages();

  console.log(messages);

  return (
    <div>
      <AddForm />
    </div>
  );
};

export default Messages;
