import { createMessage } from '@/app/actions';

const AddForm = (): React.ReactElement => {
  return (
    <form action={createMessage}>
      <div className="flex items-center rounded-full ring-1 ring-gray-300 focus-within:shadow-lg">
        <label className="sr-only" htmlFor="messageInput">
          Write a disappearing message...
        </label>
        <input
          autoFocus
          className="w-full border-0 bg-transparent px-8 py-5 focus:ring-0"
          id="messageInput"
          maxLength={255}
          name="message"
          placeholder="Write a disappearing message..."
          type="text"
        />
      </div>
    </form>
  );
};

export default AddForm;
