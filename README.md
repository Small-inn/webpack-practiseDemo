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
