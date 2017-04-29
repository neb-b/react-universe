const path = require('path')
const webpack = require('webpack')

const loadBabelLoader = () => ({
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
          plugins: [require('babel-plugin-transform-object-rest-spread')]
        }
      }
    }
  ]
})

module.exports = [
  {
    target: 'node',
    entry: {
      main: './src/server.js',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js'
    },
    module: loadBabelLoader()
  },
  {
    target: 'web',
    entry: {
      main: './src/client/index.js',
    },
    output: {
      path: path.resolve(__dirname, './client'),
      filename: 'bundle.js'
    },
    module: loadBabelLoader()
  }
]
