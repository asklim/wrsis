const path = require('path');

module.exports = {
  mode:"development",
  entry: './src/ReactApp.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static'),
    sourceMapFilename: 'bundle.map'
  },
  devtool: '#source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }  
      }
    ]
  }
};