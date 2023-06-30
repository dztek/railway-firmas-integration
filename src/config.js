export default {
  namespace: process.env.LOGICLOUD_NAMESPACE,
  stripe: {
    credentials: {
      key: process.env.STRIPE_KEY,
      secret: process.env.STRIPE_SECRET,
    },
  },
};
