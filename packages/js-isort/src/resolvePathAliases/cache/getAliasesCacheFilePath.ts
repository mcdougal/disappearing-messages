import crypto from 'crypto';
import os from 'os';
import path from 'path';

export default (): string => {
  // Make sure the cache doesn't collide across multiple projects
  const dirnameHash = crypto.createHash(`md5`).update(__dirname).digest(`hex`);

  return path.join(os.tmpdir(), `js-isort-aliases-cache-${dirnameHash}.json`);
};
