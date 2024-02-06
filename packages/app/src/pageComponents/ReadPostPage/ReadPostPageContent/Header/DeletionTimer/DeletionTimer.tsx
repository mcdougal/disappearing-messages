'use client';

import { Post } from '@/domain/post/server';
import ms from 'ms';
import { useEffect, useState } from 'react';

import { Typography } from '@/app/components';

import getTimeRemainingLabel from './getTimeRemainingLabel';

type Props = {
  post: Post;
  serverRenderedAt: Date;
};

const DeletionTimer = ({
  post,
  serverRenderedAt,
}: Props): React.ReactElement => {
  const { expiresAt } = post;

  const [timeRemainingLabel, setTimeRemainingLabel] = useState(
    getTimeRemainingLabel(expiresAt, serverRenderedAt)
  );

  useEffect(() => {
    setTimeRemainingLabel(getTimeRemainingLabel(expiresAt));

    const interval = setInterval(() => {
      setTimeRemainingLabel(getTimeRemainingLabel(expiresAt));
    }, ms(`1 second`));

    return () => {
      clearInterval(interval);
    };
  }, [expiresAt]);

  return <Typography size="xs">Deletion in {timeRemainingLabel}</Typography>;
};

export default DeletionTimer;
