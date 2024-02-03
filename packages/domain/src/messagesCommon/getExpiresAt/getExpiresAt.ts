import ms from 'ms';

export default (): Date => {
  return new Date(Date.now() + ms(`30 seconds`));
};
