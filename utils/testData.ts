export const users = {
  standard: {
    username: process.env.STANDARD_USERNAME ?? 'standard_user',
    password: process.env.STANDARD_PASSWORD ?? 'secret_sauce',
  },
  locked: {
    username: process.env.LOCKED_USERNAME ?? 'locked_out_user',
    password: process.env.LOCKED_PASSWORD ?? 'secret_sauce',
  },
  invalid: {
    username: process.env.INVALID_USERNAME ?? 'fake_user',
    password: process.env.INVALID_PASSWORD ?? 'wrong_password',
  },
};