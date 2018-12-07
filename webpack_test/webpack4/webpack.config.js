const webpack = require('webpack')
const path = require('path')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入 mini-css-extract-plugin 插件 
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')


module.exports = {
  mode: 'production',
  entry: './src/index',
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.join(__dirname, '/dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {}
          }
        ]
      }
    ]
  },
  devtool: '#eval-source-map',
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.[contenthash:8].css'
    }),
  	new HtmlWebpackPlugin({ 
      filename: 'index.html',
      template: path.join(__dirname, '/src/index.html'),
      vendorName: 'vendors.dll.[chunkhash].js',
      inject: true
    }),
    new DllReferencePlugin({
      context: path.join(__dirname, '/dist/'),
      manifest: require('./dist/vendors.manifest.json')
    })
  ]
}
