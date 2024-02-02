export default (createdAt: Date, expiresAt: Date): number => {
  const msUntilExpiration = expiresAt.getTime() - Date.now();
  const totalMs = expiresAt.getTime() - createdAt.getTime();
  const opacity = Math.round((msUntilExpiration / totalMs) * 10) / 10;

  return opacity;
};
