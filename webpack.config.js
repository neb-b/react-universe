const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

// const loadModule = () => ({
// 	rules: [
// 		{
// 			test: /\.(js|jsx)$/,
// 			exclude: /node_modules/,
// 			use: {
// 				loader: 'babel-loader',
// 				query: {
// 					presets: ['env', 'react'],
// 					plugins: [require('babel-plugin-transform-object-rest-spread')]
// 				}
// 			}
// 		},
// 		{
// 			test: /\.css$/,
// 			use: {
// 				loader: 'css-loader',
// 				options: { modules: true }
// 			}
// 		}
// 	]
// })

module.exports = [
	{
		target: 'web',
		entry: './src/client.jsx',
		output: {
			path: path.resolve(__dirname, 'public'),
			publicPath: '/public/',
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
							plugins: [require('babel-plugin-transform-object-rest-spread')]
						}
					}
				},
				{
					test: /\.css$/,
					loaders: 'style-loader!css-loader'
				}
			]
		},
		resolve: {
			extensions: ['.js', '.jsx']
		}
	},
	{
		target: 'node',
		externals: nodeExternals(),
		entry: './src/server.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/dist/',
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
							plugins: [require('babel-plugin-transform-object-rest-spread')]
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
