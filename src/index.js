export const test = ctx => (req, res, next) => {
  if (ctx?.logger) {
    ctx.logger.info('railway-firmas-integration');
  }

  res.json({
    name: 'test',
    version: process.env.LOGICLOUD_VAR,
  });
};

export const checkout = (ctx) => async (_, res) => {
  if (!ctx.stripe) {
    res.status(500).json({ error: 'MISSING_STRIPE_CONFIG' });
    return;
  }
  const line = {
    price_data: {
      currency: "usd",
      product_data: {
        name: "Sample Item",
      },
      unit_amount: 1000,
    },
    quantity: 3,
  };

  const success_url = process.env.STRIPE_SUCCESS_URL
    || ctx.getPublicUrl(req, process.env.LOGICLOUD_NAMESPACE, process.env.STRIPE_SUCCESS_URI);

  const cancel_url = process.env.STRIPE_CANCEL_URL
    || ctx.getPublicUrl(req, process.env.LOGICLOUD_NAMESPACE, process.env.STRIPE_CANCEL_URI);

  const session = await ctx.stripe.checkout.sessions.create({
    line_items: [line, line, line, line],
    mode: "payment",
    success_url,
    cancel_url,
  });

  res.redirect(303, session.url);
};

export const success = () => (req, res) => {
  res.json('Successful transaction');
};

export const cancel = () => async (req, res) => {
  res.json('Cancelled transaction');
};
