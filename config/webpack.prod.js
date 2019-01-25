//Config
const common = require('./webpack.common.js');
const constants = require('./constants.js');

//Webpack
const webpack = require('webpack');
const merge = require('webpack-merge');

//Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

//Add pages to plugins
var pagePlugins = [];
Object.keys(constants.PAGES).map(key => {
	pagePlugins.push(new HtmlWebpackPlugin({
		filename: key,
		template: constants.PATH.join(constants.PATHS.template, constants.PAGES[key]),
		favicon: constants.PATH.join(constants.PATHS.img, 'favicon/32x32.png'),
		inject: true,
		sourceMap: false,
		chunksSortMode: 'dependency',
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			removeRedundantAttributes: true,
			useShortDoctype: true,
			removeEmptyAttributes: true,
			removeStyleLinkTypeAttributes: true,
			keepClosingSlash: true,
			minifyJS: true,
			minifyCSS: true,
			minifyURLs: true,
		},
		hash: true, //Adds querystring to file
		vars: {}
	}));
})

module.exports = function() {
	return merge(
		common, 
		{
			devtool: '(none)',
			mode: 'production',
			name: 'site',
			output: {
				path: constants.PATHS.dist,
				publicPath: '/',
				filename: '[name].js', //[name]-[hash].js
				chunkFilename: '[id].[chunkhash].js',
			},
			optimization: {
				minimize: true,
				nodeEnv: 'production',
				sideEffects: true,
				concatenateModules: true,
				runtimeChunk: true,
				splitChunks: {
					cacheGroups: {
						commons: {
							test: /[\\/]node_modules[\\/]/,
							name: 'vendors',
							chunks: 'all',
						},
					},
				},
				minimizer: [
					new UglifyJsPlugin({
						cache: true,
						parallel: true,
						sourceMap: false,
						uglifyOptions: {
							compress: {
								drop_console: true,
								drop_debugger: true,
							}
						}
					})
				]
			},
			performance: {
				assetFilter: assetFilename => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
			},
			plugins: [
				new CleanWebpackPlugin([constants.PATHS.dist], {
					root: constants.ROOT
				}),
				new webpack.NoEmitOnErrorsPlugin(),
				new webpack.optimize.OccurrenceOrderPlugin(),
				new CompressionWebpackPlugin({
					asset: '[path].gz[query]',
					algorithm: 'gzip',
					threshold: 10240,
					minRatio: 0.8
				}),
				new webpack.HashedModuleIdsPlugin({
					hashFunction: 'sha256',
					hashDigest: 'hex',
					hashDigestLength: 20,
				}),
				...pagePlugins
			]
		}
	)
}