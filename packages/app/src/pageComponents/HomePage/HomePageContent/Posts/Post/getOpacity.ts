export default (postedAt: Date, expiresAt: Date, now?: Date): number => {
  const nowMs = now?.getTime() || Date.now();
  const msUntilExpiration = expiresAt.getTime() - nowMs;
  const totalMs = expiresAt.getTime() - postedAt.getTime();
  const opacity = msUntilExpiration / totalMs;

  return opacity;
};
