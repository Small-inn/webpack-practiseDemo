## Webpack命令
---
webpack -h
webpack -v

webpack-cli
> 交互式的初始化一个项目 
## Webpack配置

## 第三方脚手架
vue-cli
angular-cli
react-starter

## 打包js
```
webpack --config webpack.conf.js
```
## 编译es6
1. babel
- babel-loader 
- babel presets
- babel polyfill 全局垫片
- babel runtime transform 局部垫片 
2. typescript 

## 打包公共代码
- 配置
```
{
    plugins:[
        new webpack.optimize.CommonsChunkPlugin(options )
    ]
}
```

## 代码分割和懒加载
- 分离业务代码和第三方依赖

## 处理CSS
- style-loader
- css-loader