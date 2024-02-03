'use client';

import { MessagesFeedMessage } from '@/domain/messagesServer';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRef } from 'react';

import getOpacity from './getOpacity';
import getUpvoteMessageFormAction from './getUpvoteMessageFormAction';
import useLiveUpdatingMessage from './useLiveUpdatingMessage';
import useOpacityAnimation from './useOpacityAnimation';

type Props = {
  message: MessagesFeedMessage;
  serverRenderedAt: Date;
  upsertOptimisticMessage: (message: MessagesFeedMessage) => void;
};

const Message = ({
  message: initialMessage,
  serverRenderedAt,
  upsertOptimisticMessage,
}: Props): React.ReactElement => {
  const message = useLiveUpdatingMessage(initialMessage);

  const {
    createdAt,
    expiresAt,
    id,
    numUpvotes,
    text,
    userAvatarSrc,
    userName,
  } = message;

  const messageRef = useRef<HTMLDivElement>(null);
  useOpacityAnimation(messageRef, message);

  const formAction = getUpvoteMessageFormAction(
    message,
    upsertOptimisticMessage
  );

  return (
    <div className="animate-fade-in">
      <div
        ref={messageRef}
        className="flex items-center gap-6 break-words rounded-lg px-4 py-4 shadow-lg transition-opacity ease-linear md:px-8 md:py-6"
        style={{ opacity: getOpacity(createdAt, expiresAt, serverRenderedAt) }}>
        <div className="flex-1">
          <div className="mb-5 flex items-center gap-2">
            <Image
              alt={`User avatar for ${userName}`}
              height={24}
              src={userAvatarSrc}
              width={24}
            />
            <span className="text-xs">{userName}</span>
          </div>
          <span className="md:text-md text-sm">{text}</span>
        </div>
        <form action={formAction}>
          <button
            aria-label="Upvote"
            className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 hover:bg-slate-200"
            disabled={id.startsWith(`optimistic-`)}
            title="Upvote"
            type="submit">
            <ArrowUpIcon className="aspect-square w-4" />
            <span className="text-xs">{numUpvotes}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
