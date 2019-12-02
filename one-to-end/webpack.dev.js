'use strict'

const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

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
                chunks: [pageName],
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
        filename: '[name].js'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /.js$/,
                use: 'babel-loader'
            },
            {
                test: /.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test: /.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin()
    // new HtmlWebpackExternalsPlugin({
    //   externals: [
    //     {
    //       module: 'react',
    //       entry: 'https://11.url.cn/now/lib/4/react-with-addons.min.js', // 可以是本地文件或者cdn文件
    //       global: 'React'
    //     },
    //     {
    //       module: 'react-dom',
    //       entry: 'dist/jquery.min.js',
    //       global: 'ReactDom'
    //     }
    //   ]
    // })
    ].concat(htmlWebpackPlugin),
    devServer: {
        contentBase: './dist',
        hot: true
    }
}
