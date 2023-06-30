import express from 'express';
import { build } from '@firmas/build';
import context from './src/context.js';
import config from './src/config.js';
import * as source from './src/index.js';

const app = express();
const firmas = build({ config }, { context, framework: 'express' });

app.use(firmas(source));

app.get('/version', (req, res) => {
  res.json({
    name: 'version',
    version: process.env.LOGICLOUD_VAR
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
