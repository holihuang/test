
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")

const path = require('path')
const srcPath = path.resolve('src')

module.exports = {
    // 入口文件
    entry: [
        'react-hot-loader/patch',
        path.resolve(srcPath, 'index.js')
    ],               
    // 出口文件
    output: {
        filename: 'bundle.js',
        path: path.resolve('dist')
    },  
    // 处理对应模块            
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },              
    // 对应的插件
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: "index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),  //热替换
    ],
    devServer: {
        contentBase: './dist',
        host: 'localhost',      // 默认是localhost
        port: 3000,             // 端口
        open: true,             // 自动打开浏览器
        hot: true               // 开启热更新
    },           // 开发服务器配置
    mode: 'development'      // 模式配置
}