import { queryMessagesFeed } from '@/domain/messagesServer';

import Messages from './Messages';
import { getRandomUser } from '@/domain/messagesCommon';

const HomePage = async (): Promise<React.ReactElement> => {
  const messages = await queryMessagesFeed();
  const serverRenderedAt = new Date();
  const user = getRandomUser();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className=" mb-4 inline-block bg-gradient-to-b from-black to-white bg-clip-text text-5xl text-transparent md:text-6xl">
        Disappearing Messages
      </h1>
      <p className="text-md mb-12 text-gray-400">
        Write a message - we’ll delete it. Upvote to keep it alive.
      </p>
      <Messages
        messages={messages}
        serverRenderedAt={serverRenderedAt}
        user={user}
      />
    </div>
  );
};

export default HomePage;
