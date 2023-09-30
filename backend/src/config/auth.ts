export const auth = {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? 'secret',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '1d',
}
