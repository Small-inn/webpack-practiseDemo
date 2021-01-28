const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  externals: ['lodash'], // 外部扩展 防止import的包 打包到bundle中
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: 'library', 
    libraryTarget: 'umd' // 挂载到全局
  },
  module: {},
  plugins: []
  
}