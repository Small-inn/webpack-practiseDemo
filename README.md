# webpack-practiseDemo

---

study webpack config

## 初始 webpack

1. 配置文件名称
   : webpack.config.js
   可以通过 webpack --config 指定配置文件
2. webpack 配置组成

```
module.exports = {
  entry: './src/index.js', // 打包的入口文件
  output: './dist/main.js', // 打包的输出
  mode: 'production', // 环境
  module: {
    rules: [ // loader配置
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [ // 插件配置
    new HtmlwebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```

3. 创建 webpack-demo

```
npm init -y
npm install webpack webpack-cli --save-dev
./node_modules/.bin/webpack -v // 查看webpack版本
```

4. webpack 热更新原理解析
   首先 webpack compiler 将 js 编译成 Bundle.js（构建输出的文件）,然后 HMR Server 将热更新文件传输给 HMR Runtime， 然后 Bundle server 提供文件在浏览器访问 HMR Runtime 会被注入到浏览器更新文件对的变化

5. 文件指纹（就是文件资源后面的后缀，通常用来做版本控制）
   如何生成?
   hash: 和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改
   chunkhash: 和 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值(打包 js)
   contenthash：根据文件内容来定义 hash，文件内容不变，则 contenthash 不变（一般用来打包 css）

6. 代码压缩
   HTML 压缩:html-webpack-plugin,设置压缩参数
   css 压缩:optimize-css-assets-webpack-plugin 配合 cssnano(处理器)
   js 压缩:内置 uglifyjs-webpack-plugin

7. 自动清理构建目录产物
   rm -rf ./dist && webpack
   clean-webpack-plugin 默认删除 output 指定的输出目录

8. css 功能增强
   postcss 插件 autoprefixer 自动补齐 css3 前缀

9. 移动端 css px 自动转换成 rem
   使用 px2rem-loader, 页面渲染时计算根元素的 font-size 值，可以使用 lib-flexible 库

10. 资源内联
    raw-loader
    页面框架初始化脚本
    上报相关打点
    css 内联避免页面闪动
    小图片或者字体内联

11. 多页面打包配置
    动态获取 entry 某一个目录下面文件和设置 html-webpack-plugin 数量

    ```
    <!-- 设置多页面打包 -->
    setMPA = () => {
      const entry = {}
      const htmlWebpackPlugins = []

      const entryFiles = glob.sync(path.join(__dirname, './src/*/index.js'))

      Object.keys(entryFiles).map(index => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.*)\/index\.js)
        const pageName = match && match[1]

        entry[pageName] = entryFile

        htmlWebpackPlugins.push(
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

      return {
        entry,
        htmlWebpackPlugins
      }
    }

    const { entry, htmlWebpackPlugins } = setMPA()
    ```

12. source map
    开发环境开启，线上环境关闭
    eval: 使用 eval 包裹模块代码
    source map: 产生.map 文件
    cheap: 不包含列信息
    inline: 将.map 作为 DataURI 嵌入，不单独生成.map 文件
    module: 包含 loader 的 sourcemap

13. 提取页面公共资源
    基础库分离：通过 cdn 引入，不计入 bundle
    SplitChunksPlugin 进行公共脚本分离，代替 CommonsChunkPlugin 插件
    chunks 参数说明：
    async: 异步引入的库进行分离（默认）
    initial: 同步引入的库进行分离
    all: 所有引入的库进行分离（推荐）

14. tree shaking(摇树优化)
    模块中可能有多个方法，只要其中某个方法使用到了，则整个文件都会被打到 bundle 里面去，tree shaking 就是只把用到的方法打入 bundle，没用到的方法会在 uglify 阶段擦出掉，支持 es6，不支持 cjs 写法
    使用：webpack 默认支持，在.babelrc 里设置 modules: false 即可
15. scoped Hoisting 的使用以及原理分析
    大量函数闭包包裹代码，导致体积增大
    被 webpack 转换后的模块会带上一层包裹
    import 会被转换成\_webpack_require
    原理：将所有模块的 diamante 按照引用顺序放在一个函数的作用域里，然后适当的重命名一些变量防止变量名冲突
    对比：通过 scope hoisting 可以减少函数生命代码和内存开销
16. 代码分割（动态 import）
    抽离相同代码到一个共享块
    脚本懒加载，使得初始下载的代码更小
