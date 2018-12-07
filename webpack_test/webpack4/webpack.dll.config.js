const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin')
// 清除dist目录下的文件
const ClearWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  // JS 执行入口文件
  entry: {
    // 把 React 相关模块的放到一个单独的动态链接库
    vendors: ['react', 'lodash'],
  },
  output: {
    filename: '[name].dll.[chunkhash].js',
    // 输出的文件都放到 dist 目录下
    path: path.resolve(__dirname, 'dist'),
    library: '_dll_[name]',
  },
  plugins: [
    new ClearWebpackPlugin(['dist']),
    new DllPlugin({
      name: '_dll_[name]',
      path: path.join(__dirname, 'dist', '[name].manifest.json'),
    }),
  ],
}