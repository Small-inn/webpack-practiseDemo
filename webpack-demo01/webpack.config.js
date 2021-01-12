const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  // devtool: 'source-map', // cheap-source-map、cheap-module-eval-source-map
  entry: {
    main: './src/index.js'
    // sub: './src/index.js'
  },
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8088,
    hot: true,
    hotOnly: true
  },
  module: {
    rules: [
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: {
          // loader: 'file-loader',
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 204800
          }
        }
      }, 
      {
        test: /\.(eot|ttf|svg)$/,
        use: {
          loader: 'file-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true // css module
            }
          }
        ]
      }
    ]
  },

  output: {
    // publicPath: 'http://cdn.com.cn',
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin()
  ]

}