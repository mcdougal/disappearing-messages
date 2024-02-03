export default (createdAt: Date, expiresAt: Date, now?: Date): number => {
  const nowMs = now?.getTime() || Date.now();
  const msUntilExpiration = expiresAt.getTime() - nowMs;
  const totalMs = expiresAt.getTime() - createdAt.getTime();
  const opacity = msUntilExpiration / totalMs;

  return opacity;
};
