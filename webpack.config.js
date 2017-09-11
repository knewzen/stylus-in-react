const path = require('path');
const webpack = require('webpack');

const output = () => ({
  filename: '[name].js',
  path: path.resolve(__dirname, 'build'),
  publicPath: '/',
  libraryTarget: 'umd'
});

const externals = () => ({
  "inline-style-prefixer": "inline-style-prefixer",
  "camel-case": "camel-case",
  "css": "css",
  "glamor": "glamor",
  "html-tags": "html-tags",
  "react": "react"
})

const jsLoader = () => ({
  test: /\.js$/,
  include: path.resolve(__dirname, 'src'),
  exclude: ['node_modules', 'public'],
  use: 'babel-loader'
});

const plugins = () => (
  [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'production'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      output: {
        comments: false,
        ascii_only: true,
      }
    })
  ]
);

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: output(),
  target: 'web',
  node: {
    fs: "empty"
  },
  externals: externals(),
  module: {
    rules: [jsLoader()]
  },
  plugins: plugins()
}