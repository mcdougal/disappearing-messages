'use client';

import { useEffect, useState } from 'react';

import getOpacity from './getOpacity';

type Message = {
  createdAt: Date;
  expiresAt: Date;
  text: string;
};

type Props = {
  message: Message;
};

const Message = ({ message }: Props): React.ReactElement => {
  const { createdAt, expiresAt, text } = message;
  const [opacity, setOpacity] = useState(getOpacity(createdAt, expiresAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(getOpacity(createdAt, expiresAt));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [createdAt, expiresAt]);

  return (
    <div
      className="animate-fade-in min-w-64 break-words rounded-lg px-8 py-6 shadow-lg transition ease-linear"
      style={{ opacity }}>
      {text}
    </div>
  );
};

export default Message;
