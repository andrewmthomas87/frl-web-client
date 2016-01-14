var webpack = require('webpack')
var path = require('path')

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var LessPluginAutoPrefix = require('less-plugin-autoprefix')

var config = {
	context: path.join(__dirname, 'src'),
	devServer: {
		historyApiFallback: true
	},
	devTool: 'eval',
	entry: {
		frl: 'app'
	},
	lessLoader: {
		lessPlugins: [new LessPluginAutoPrefix({ browsers: ['> 5%'] })]
	},
	module: {
		loaders: [
			{
				test: /\.(jsx|es6)$/,
				loader: 'babel',
				include: path.join(__dirname, 'src')
			},
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?-minimize!less')
			}
		]
	},
	output: {
		path: path.join(__dirname, 'build'),
		filename: '[name].js'
	},
	plugins: [
		new ExtractTextPlugin('[name].css'),
		new webpack.NoErrorsPlugin()
	],
	resolve: {
		root: [path.join(__dirname, 'src')],
		extensions: ['', '.js', '.jsx', '.es6']
	},
	target: 'web'
}

module.exports = config
