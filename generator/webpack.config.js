const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    // 入口文件
    entry: [
        `${path.resolve(__dirname, 'src/index.js')}`
    ],
    // devtool: 'inline-source-map',
    // 出口文件
    output: {
        // 打包的路径
        path: path.resolve('dist'),
        // 打包的文件名
        filename: 'bundle.js'
    },
    // 对应模块
    module: {
        rules: [
        	{
        		test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
        			loader: 'babel-loader'
				}
			},
            {
                test: /\.css$/,
                use: [ 'style.loader', 'css.loader' ]  //处理css
            }, {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        outputPath: 'images/',  // 输出到imgages目录下
                        limit: 500    // 小于500B的图片打成base64格式写入js
                    },
                }]
            }
        ]
    },
    // 对应插件
    plugins: [
        new HtmlWebpackPlugin({
            // 输出文件名
            filename: 'index.html',
            // 模板文件
            template: './src/index_tempt.html',
            hash: true,
        })
    ],
    // 开发服务器
    devServer: {
		contentBase: './src',
		port: 8080,
		open: true
    },
	mode: 'development'
}