const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = [
	{
		target: 'web',
		entry: './client/client.jsx',
		output: {
			path: path.resolve(__dirname, 'public'),
			publicPath: 'public/',
			filename: 'bundle.js'
		},
		devtool: 'inline-source-map',
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						query: {
							presets: ['env', 'react'],
							plugins: [
								require('babel-plugin-transform-object-rest-spread')
							]
						}
					}
				}
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				'__DEV__': process.env.NODE_ENV === 'dev'
			})
		],
		resolve: {
			extensions: ['.js', '.jsx']
		}
	},
	{
		target: 'node',
		externals: nodeExternals(),
		entry: './index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			publicPath: 'dist/',
			filename: 'bundle.js'
		},
		devtool: 'inline-source-map',
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						query: {
							presets: ['env', 'react'],
							plugins: [
								require('babel-plugin-transform-object-rest-spread')
							]
						}
					}
				}
			]
		},
		resolve: {
			extensions: ['.js', '.jsx']
		}
	}
]
