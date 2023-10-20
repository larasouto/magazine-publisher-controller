export const auth = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? 'JWT_SUPER_SECRET',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
}
