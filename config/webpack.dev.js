//Config
var common = require('./webpack.common.js');
var constants = require('./constants.js');

//Webpack
const webpack = require('webpack');
const merge = require('webpack-merge')
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//Add pages to plugins
var pagePlugins = [];
Object.keys(constants.PAGES).map(key => {
	pagePlugins.push(new HtmlWebpackPlugin({
		filename: key,
		template: constants.PATH.join(constants.PATHS.template, constants.PAGES[key]),
		inject: true,
		hash: true, //Adds querystring to file
		vars: {}
	}));
});

module.exports = function() {
	return merge(common, {
		mode: 'development',
		devtool: 'inline-sourcemap',
		name: 'site',
		output: {
			path: constants.PATHS.dist,
			publicPath: '/',
			filename: '[name].js', //[name]-[hash].js
			chunkFilename: '[id].[chunkhash].js',
		},
		optimization: {
		    minimize: false,
		},
		performance: {
			hints: 'warning',
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			...pagePlugins
		],
		devServer: {
			host: 'localhost',
			port: '8080',
			historyApiFallback: true,
			inline: true,
			hot: true,
			contentBase: constants.PATHS.dist,
			publicPath:'/',
		}
	});
}