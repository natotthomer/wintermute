const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8081',
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'src', 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/, /\.es6$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: [/\.css$/],
        loader: ExtractTextPlugin.extract('css-loader')
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ],
  devtool: 'source-map'
}
