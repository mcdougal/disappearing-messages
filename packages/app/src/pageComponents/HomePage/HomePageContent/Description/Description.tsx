import { getExpirationDurationString } from '@/domain/post/common';

import { Typography } from '@/app/components';

const Description = (): React.ReactElement => {
  return (
    <div className="m-3 rounded-lg bg-gray-100 px-4 py-2 text-center sm:mx-0 sm:my-4">
      <Typography size="sm">
        👉 Posts fade away in {getExpirationDurationString()}. Upvote or comment
        to keep them alive.
      </Typography>
    </div>
  );
};

export default Description;
