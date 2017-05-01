const path = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const loadBabelLoader = () => ({
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: ['env', 'react'],
          plugins: [require('babel-plugin-transform-object-rest-spread')]
        }
      }
    }
  ]
})

module.exports = [
  {
    target: 'web',
    entry: './src/client.js',
    output: {
      path: path.resolve(__dirname, 'public'),
      publicPath: '/public/',
      filename: 'bundle.js'
    },
    module: loadBabelLoader(),
    plugins: [
      new ProgressBarPlugin()
    ]
  }
]
