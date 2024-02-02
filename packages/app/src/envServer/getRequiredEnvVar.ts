import 'server-only';

export default (envVarName: string): string => {
  const value = process.env[envVarName];

  if (!value) {
    throw new Error(`Missing environment variable: ${envVarName}`);
  }

  return value;
};
