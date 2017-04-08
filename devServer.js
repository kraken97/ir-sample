import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import express from 'express';
import path from 'path';
import http from 'http';
import webpackConfig from './webpack.config.babel';

const app = express();
const WEBPACK_PORT = 3001;
const compiler = webpack(webpackConfig);

app.use(webpackMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  watchOptions: { aggregateTimeout: 300, poll: 1000 },
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
  },
  proxy: {
    '/api/': {
      target: 'http://localhost:3000',
      pathRewrite: { '^/api': '' },
    },
  },
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false,
  },
}));

app.use(webpackHotMiddleware(compiler));

// This is necessary to handle URL correctly since client uses Browser History
app.get('*', (request, response) => response.sendFile(path.resolve(__dirname, '', './dist/index.html')));

app.listen(WEBPACK_PORT, 'localhost', (err) => {
  if (err) {
    console.log(err);
  }

  console.log(`WebpackDevServer listening at localhost:${WEBPACK_PORT}`);
});

http.createServer(app);
