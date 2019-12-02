'use strict'

const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const setMPA = () => {
    const entry = {}
    const htmlWebpackPlugin = []
    const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))

    Object.keys(entryFiles).map(index => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.*)\/index\.js/)
        const pageName = match && match[1]
        // console.log(pageName)
        entry[pageName] = entryFile
        htmlWebpackPlugin.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `src/${pageName}/index.html`),
                filename: `${pageName}.html`,
                chunks: ['vendors', pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            })
        )
    })
    // console.log(entryFiles)
    return {
        entry,
        htmlWebpackPlugin
    }
}

const { entry, htmlWebpackPlugin } = setMPA()

module.exports = {
    entry: entry,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name]_[chunkhash:8].js'
    },
    mode: 'production', // 如果mode的值是production,会默认开启一些webpack4的内置插件
    // mode: 'none',
    module: {
        rules: [
            {
                test: /.js$/,
                use: ['babel-loader', 'eslint-loader']
            },
            {
                test: /.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                    {
                        loader: 'postcss-loader', // autoprefixer、css3自动添加前缀loader
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    browsers: ['last 2 version', '>1%', 'ios 7']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'px2rem-loader', // 尺寸适配兼容loader
                        options: {
                            remUnit: 75, // 基础单位1rem = 75px
                            remPrecision: 8 // 小数点
                        }
                    }
                ]
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:8][ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin(), // 自动清除构建产物
        // new HtmlWebpackExternalsPlugin({
        //   externals: [
        //     {
        //       module: 'react',
        //       entry: 'https://11.url.cn/now/lib/4/react-with-addons.min.js', // 可以是本地文件或者cdn文件
        //       global: 'React',
        //     },
        //     {
        //       module: 'react-dom',
        //       entry: 'dist/jquery.min.js',
        //       global: 'ReactDom',
        //     }
        //   ],
        // })
        // new webpack.optimize.ModuleConcatenationPlugin() // scope Hoisting(),mode=production默认开启
        new FriendlyErrorsWebpackPlugin() // 优化构建命令日志
    ].concat(htmlWebpackPlugin),
    // stats: 'errors-only' // preset构建时命令行日志信息 效果类似于friendly-errors-webpack-plugin插件
    // devtool: 'source-map'
    // optimization: {
    //   splitChunks: {
    //     minSize: 0, // 提取公共文件的最小大小
    //     cacheGroups: {
    //       commons: {
    //         // test: /(react|react-dom)/,
    //         // name: 'vendors',
    //         name: 'commons',
    //         chunks: 'all',
    //         minChunks: 2
    //       }
    //     }
    //   }
    // }
}
