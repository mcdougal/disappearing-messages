import ms from 'ms';

import getExpirationDurationString from '../getExpirationDurationString';

export default (): Date => {
  const expiresAt = new Date(Date.now() + ms(getExpirationDurationString()));
  // Millisecond resolution seems to be getting removed when the created
  // post comes back from the DB, but we need the expiration timestamp
  // to match with the optimistically created post so we trim the
  // milliseconds.
  expiresAt.setMilliseconds(0);
  return expiresAt;
};
