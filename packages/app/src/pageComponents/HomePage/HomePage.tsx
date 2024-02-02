import { queryMessagesFeed } from '@/domain/messages';

import Messages from './Messages';

const HomePage = async (): Promise<React.ReactElement> => {
  const messages = await queryMessagesFeed();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className=" mb-4 inline-block bg-gradient-to-b from-black to-white bg-clip-text text-5xl text-transparent md:text-6xl">
        Disappearing Messages
      </h1>
      <p className="text-md mb-12 text-gray-400">
        Write a message - we’ll delete it. Upvote to keep it alive.
      </p>
      <Messages messages={messages} />
    </div>
  );
};

export default HomePage;
