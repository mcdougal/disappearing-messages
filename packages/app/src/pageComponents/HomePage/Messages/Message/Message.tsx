'use client';

import { MessagesFeedMessage } from '@/domain/messagesServer';
import { ArrowUpIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import getOpacity from './getOpacity';

type Props = {
  message: MessagesFeedMessage;
  serverRenderedAt: Date;
};

const Message = ({ message, serverRenderedAt }: Props): React.ReactElement => {
  const { createdAt, expiresAt, numUpvotes, text, userAvatarSrc, userName } =
    message;

  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (messageRef.current) {
        messageRef.current.style.opacity = getOpacity(
          createdAt,
          expiresAt
        ).toString();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [createdAt, expiresAt]);

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
        <button
          aria-label="Upvote"
          className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 hover:bg-slate-200"
          title="Upvote">
          <ArrowUpIcon className="aspect-square w-4" />
          <span className="text-xs">{numUpvotes}</span>
        </button>
      </div>
    </div>
  );
};

export default Message;
