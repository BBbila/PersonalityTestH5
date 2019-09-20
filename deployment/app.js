const express = require('express');
const favicon = require('serve-favicon');
const proxy = require('http-proxy-middleware');
const path = require('path');
const compression = require('compression');
const bodyParser = require('body-parser');
const app = express();

//本地环境
const config = require('./config');
//线上环境
// const __config = require('../conf/config');

app.use(compression());

const options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '7d',
  redirect: false,
  setHeaders: function(res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
};

// http代理
app.use(
  proxy(
    [
      `${config.CONTEXT}/photoapi/v3/albumquery`,
      `${config.CONTEXT}/netdisk/v2/queryspace`,
      `${config.CONTEXT}/photoapi/v2/countall`,
      `${config.CONTEXT}/photoapi/v3/albumadd`,
      `${config.CONTEXT}/photoapi/v5/photodel`
    ], {
    pathRewrite: { [`^${config.CONTEXT}`]: '' },
    target: config.API_HOST,
    changeOrigin: true
  })
);

app.use(
  proxy([`${config.CONTEXT}/photoapi/v1/uploadWithWeb`], {
    pathRewrite: { [`^${config.CONTEXT}`]: '' },
    target: config.API_HOST_UPLOAD,
    changeOrigin: true
  })
);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(`${config.CONTEXT}/static`, express.static(path.join(__dirname, 'build', 'static'), options));

app.use(`${config.CONTEXT}/*`, (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//线上环境
/*
app.listen(__config.port, __config.host, err => {
  if (!err) {
    console.log(
      `listening on http://${__config.host}:${__config.port}/${config.CONTEXT}`
    );
  } else {
    throw err;
  }
});
*/

//本地环境
app.listen(config.port, config.host, err => {
  if (!err) {
    console.log(
      `listening on http://${config.host}:${config.port}/${config.CONTEXT}`
    );
  } else {
    throw err;
  }
});
