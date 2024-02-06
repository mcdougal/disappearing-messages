export default (updatedAt: Date, expiresAt: Date, now?: Date): number => {
  const nowMs = now?.getTime() || Date.now();
  const msUntilExpiration = expiresAt.getTime() - nowMs;
  const totalMs = expiresAt.getTime() - updatedAt.getTime();
  const opacity = msUntilExpiration / totalMs;

  return Math.max(opacity, 0.1);
};
