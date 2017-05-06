const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

module.exports = [
	{
		target: 'web',
		entry: './client/client.jsx',
		output: {
			path: path.resolve(__dirname, 'public'),
			publicPath: 'public/',
			filename: 'bundle.js'
		},
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
				},
				{
					test: /\.css$/,
					loaders: 'style-loader!css-loader'
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
				},
				{
					test: /\.css$/,
					use: {
						loader: 'css-loader',
						options: { modules: true }
					}
				}
			]
		},
		resolve: {
			extensions: ['.js', '.jsx']
		}
	}
]
