import { getExpirationDurationString } from '@/domain/post/common';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Create Post - Disappearing Messages`,
  description: `Your post will disappear after ${getExpirationDurationString()}. Upvotes and comments reset the clock.`,
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

const CreatePostPageLayout = ({ children }: Props): React.ReactNode => {
  return children;
};

export default CreatePostPageLayout;
