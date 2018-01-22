var webpack = require('webpack'); //给下边的webpack.xxx使用
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //从js中分离出css
var HtmlWebpackPlugin = require('html-webpack-plugin'); //将html引入，并且将对应的js,css引入
//环境变量的配置
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

var htmlConfig = function(name,title) {
	return {
		template: './src/view/' + name + '.html',
		filename: 'view/' + name + '.html',
		title:title,
		hash: true,
		inject: true,
		chunks: ['common', name]
	}
}
var config = {
	entry: {
		'common': ['./src/page/common/index.js'],
		'index': ['./src/page/index/index.js'],
		'500page':['./src/page/500page/500page.js'],
		'login': ['./src/page/login/index.js'],
		'resource-pool': ['./src/page/resource-pool/index.js'],
		'task-center': ['./src/page/task-center/index.js'],
		'help-center': ['./src/page/help-center/index.js'],
		'account-management': ['./src/page/account-management/index.js'],
		'user-register': ['./src/page/user-register/index.js'],
		'com-test': ['./src/page/com-test/index.js'],
		'com-test-new': ['./src/page/com-test-new/index.js'],
		'com-test-result': ['./src/page/com-test-result/index.js']
	},
	output: {
		path: __dirname + '/dist', //webpack 1.xxx以上的版本如果不加__dirname，找不到路径呀
//		publicPath: '/dist', 
//		publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '/dist/',
		publicPath  : '/dist/',
		//这条是为了在webpack-dev-server上能正常使用才加的，不然找不到对应的路径
		filename: 'js/[name].js'
	},
	module: {
		loaders: [{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
			
			{
				test: /\.string$/,
				loader: 'html-loader',
				query: {
					minimize: true,
					removeAttributeQuotes: false
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("css/[name].css"),
		new HtmlWebpackPlugin(htmlConfig('index','首页')),
		new HtmlWebpackPlugin(htmlConfig('505','505')),
		new HtmlWebpackPlugin(htmlConfig('login','登录页')),
		new HtmlWebpackPlugin(htmlConfig('resource-pool','资源池')),
		new HtmlWebpackPlugin(htmlConfig('task-center','任务中心')),
		new HtmlWebpackPlugin(htmlConfig('help-center','帮助中心')),
		new HtmlWebpackPlugin(htmlConfig('account-management','账户管理')),
		new HtmlWebpackPlugin(htmlConfig('user-register','用户xx')),
		new HtmlWebpackPlugin(htmlConfig('com-test','复杂业务测试')),
		new HtmlWebpackPlugin(htmlConfig('com-test-new','复杂业务测试--新建')),
		new HtmlWebpackPlugin(htmlConfig('com-test-result','复杂业务测试--结果'))
	],
	resolve: {
		alias: {
			'util': __dirname + '/src/util',
			'service': __dirname + '/src/service',
			'view': __dirname + '/src/view',
			'page': __dirname + '/src/page'
		}
	},
	devServer:{
		proxy:{
			'/api/*':{
				target: 'https://api.douban.com/v2/book/1220562',
			}
		}
	}
}
//当执行为dev的时候，就给entry内的common中加入这条语句，就可以热启动，如果不是dev，就不需要热启动的功能
if(WEBPACK_ENV === 'dev') {
	config.entry.common.push('webpack-dev-server/client?http://localhost:8099/')
}
module.exports = config;