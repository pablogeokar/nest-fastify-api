export default () => ({
  COOKIE_SECRET:
    process.env.COOKIE_SECRET || 'df78e6e95b925610c8d1099ad3a12328',
  JWT_SECRET: process.env.JWT_SECRET || 'ad820de7200cf1c42d0d28465b4df85b',
});
