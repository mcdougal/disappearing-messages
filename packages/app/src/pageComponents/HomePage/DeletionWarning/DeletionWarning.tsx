import { getExpirationDurationString } from '@/domain/post/common';

import { Announcement } from '@/app/components';

const DeletionWarning = (): React.ReactElement => {
  return (
    <div className="p-3">
      <Announcement>
        👉 Posts are deleted after {getExpirationDurationString()}. Upvote or
        comment to reset the clock.
      </Announcement>
    </div>
  );
};

export default DeletionWarning;
