## 准备工具
1. 知乎搜素mac下比较好用的命令行工具
     www.iterm2.com
     hmyz.sh
2. Node和npm安装

## webpack概述
功能：
1.0 版本
1. 编译、打包
2. HMR(模块热更新)
3. 代码分割
4. 文件处理
2.0 版本
1. Tree Shaking(移除废代码)
2. ES module
3. 动态Import(其实是一个函数)
4. 新的文档
3.0 版本
1. Scope Hoisting(作用域提升)
2. Magic Comments （配合动态Import 使用）
## webpack版本
详情见迁移指南
## webpack更迭

## 核心概念
1. Entry(代码入口、打包出口，单个或者多个出口)
2. Output(打包生成的文件、一个或者多个、自定义规则)
3. Loader(处理文件，转化为模块)
4. Plugins(参与整个大包过程，打包优化和压缩，配置编译时的变量)