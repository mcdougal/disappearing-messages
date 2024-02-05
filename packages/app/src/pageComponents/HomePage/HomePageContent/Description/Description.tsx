import { getExpirationDurationString } from '@/domain/post/common';

const Description = (): React.ReactElement => {
  return (
    <div className="px-3 py-3 sm:py-7">
      <p className="text-sm text-gray-500">
        Posts slowly disappear in {getExpirationDurationString()}. Upvote or
        comment to reset the clock.
      </p>
    </div>
  );
};

export default Description;
