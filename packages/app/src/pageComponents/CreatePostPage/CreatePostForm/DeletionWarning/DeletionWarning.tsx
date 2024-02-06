import { getExpirationDurationString } from '@/domain/post/common';

import { Announcement } from '@/app/components';

const DeletionWarning = (): React.ReactElement => {
  return (
    <div className="p-3">
      <Announcement>
        👉 Your post will be deleted after {getExpirationDurationString()}.
        Upvotes and comments reset the clock.
      </Announcement>
    </div>
  );
};

export default DeletionWarning;
