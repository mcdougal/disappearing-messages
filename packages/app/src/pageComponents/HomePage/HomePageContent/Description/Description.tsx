import { getExpirationDurationString } from '@/domain/post/common';

import { Typography } from '@/app/components';

const Description = (): React.ReactElement => {
  return (
    <div className="px-3 py-3 sm:py-7">
      <Typography color="gray" size="sm">
        Posts slowly disappear in {getExpirationDurationString()}. Upvote or
        comment to reset the clock.
      </Typography>
    </div>
  );
};

export default Description;
