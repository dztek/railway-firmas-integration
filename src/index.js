export const test = ctx => (req, res, next) => {
  if (ctx?.logger) {
    ctx.logger.info('railway-firmas-integration');
  }
  res.json({
    name: 'test',
    version: process.env.LOGICLOUD_VAR
  });
}
