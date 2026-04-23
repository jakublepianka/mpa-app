export const requireEnv = (name: string): string => {
  const val = process.env[name];
  if (!val) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return val;
};

export const env = {
  NCBI_API_KEY: requireEnv("NCBI_API_KEY"),
};
