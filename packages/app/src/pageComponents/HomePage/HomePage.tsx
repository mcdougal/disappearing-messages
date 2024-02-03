import { makeRandomUser } from '@/domain/messagesCommon';
import { queryMessagesFeed } from '@/domain/messagesServer';

import Messages from './Messages';

export const dynamic = `force-dynamic`;

const HomePage = async (): Promise<React.ReactElement> => {
  const messages = await queryMessagesFeed();
  const serverRenderedAt = new Date();
  const user = makeRandomUser();

  return (
    <div className="mx-auto max-w-4xl px-4 pb-40 pt-6 md:pt-10">
      <h1 className=" mb-4 inline-block bg-gradient-to-b from-black to-white bg-clip-text text-5xl text-transparent md:text-6xl">
        Disappearing Messages
      </h1>
      <p className="text-md mb-12 text-gray-400">
        Write a message - it will slowly disappear. Upvote to keep it alive.
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
