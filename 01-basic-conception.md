## webpack概念
> webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle。
![图示]()
- 核心概念
    - 入口
    - 输出
    - loader
    - 插件(plugins)
## 入口(entry)
> 指示 webpack应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。
## 输出(output)
> output 属性告诉webpack在哪里输出它所创建的bundles，以及如何命名这些文件。你可以通过在配置中指定一个output字段，来配置这些处理过程：
## loader
> loader 让 webpack 能够去处理那些非 JavaScript 文件（webpack 自身只理解 JavaScript）。loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块，然后你就可以利用 webpack 的打包能力，对它们进行处理。
## 插件(plugins)
> 插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量。插件接口功能极其强大，可以用来处理各种各样的任务。