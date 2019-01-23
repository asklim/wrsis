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
      },
      {
        test: /\.(s*)css$/,
        // порядок имеет значение: применяются с конца (last to first)
        // сначала css-loader, затем style-loader.        
        use: [{
          loader: 'style-loader' // inject CSS to page
        }, {
          loader: 'css-loader' // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post CSS actions
          options: { plugins: function (){
                                return [
                                  require('precss'),
                                  require('autoprefixer')
                                ];
                              }
          }
        }, {
          loader: 'sass-loader'   // compiles Sass to CSS 
        }]
      }
    ]
  }
};