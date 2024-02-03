'use client';

import { useEffect, useRef } from 'react';

import getOpacity from './getOpacity';

type Message = {
  createdAt: Date;
  expiresAt: Date;
  text: string;
};

type Props = {
  message: Message;
  serverRenderedAt: Date;
};

const Message = ({ message, serverRenderedAt }: Props): React.ReactElement => {
  const { createdAt, expiresAt, text } = message;
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
    <div className="animate-fade-in min-w-64">
      <div
        ref={messageRef}
        className="break-words rounded-lg px-8 py-6 shadow-lg transition-opacity ease-linear"
        style={{ opacity: getOpacity(createdAt, expiresAt, serverRenderedAt) }}>
        {text}
      </div>
    </div>
  );
};

export default Message;
