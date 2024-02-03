import ms from 'ms';

export default (): Date => {
  const expiresAt = new Date(Date.now() + ms(`5 minutes`));
  // Millisecond resolution seems to be getting removed when the created
  // message comes back from the DB, but we need the expiration timestamp
  // to match with the optimistically created message so we trim the
  // milliseconds.
  expiresAt.setMilliseconds(0);
  return expiresAt;
};
