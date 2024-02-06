export default (expiresAt: Date, now?: Date): string => {
  const nowMs = now?.getTime() || Date.now();
  const msUntilExpiration = expiresAt.getTime() - nowMs;

  const hoursUntilExpiration = Math.floor(msUntilExpiration / 1000 / 60 / 60);
  const hoursUntilExpirationMs = hoursUntilExpiration * 1000 * 60 * 60;

  const msRemainingAfterHours = msUntilExpiration - hoursUntilExpirationMs;
  const minutesUntilExpiration = Math.floor(msRemainingAfterHours / 1000 / 60);
  const minutesUntilExpirationMs = minutesUntilExpiration * 1000 * 60;

  const msRemainingAfterMinutes =
    msRemainingAfterHours - minutesUntilExpirationMs;
  const secondsUntilExpiration = Math.floor(msRemainingAfterMinutes / 1000);

  if (hoursUntilExpiration < 0) {
    return `0:00:00`;
  }

  return [
    `${hoursUntilExpiration}`,
    `${minutesUntilExpiration}`.padStart(2, `0`),
    `${secondsUntilExpiration}`.padStart(2, `0`),
  ].join(`:`);
};
