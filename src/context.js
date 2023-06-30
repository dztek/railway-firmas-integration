export default {
  logger: console,
  getPublicUrl(req, ...uris) {
    return req.protocol + '://' + req.get('host') + ['', ...uris].join('/');
  },
};
