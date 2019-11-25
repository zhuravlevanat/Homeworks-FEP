const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ws = require('ws');


module.exports = {
  entry: './src/scripts/app.js',
  mode: 'development',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist',
    proxy: {
      '/api': {
         target: 'wss://fep-app.herokuapp.com/',
         ws: true
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};