"use strict";

const path = require('path');

module.exports = {
  entry: './src/hello.jsx',
  output: {
    filename: 'hello.js',
    path: path.resolve(__dirname, 'static')
  }
};