const path = require('path')
const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const loadModule = () => ({
	rules: [
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: {
				loader: 'babel-loader',
				query: {
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
		entry: './src/client.jsx',
		output: {
			path: path.resolve(__dirname, 'public'),
			publicPath: '/public/',
			filename: 'bundle.js'
		},
		module: loadModule(),
		resolve: {
			extensions: ['.js', '.jsx']
		}
	}
]
