const JSZip = require('jszip')
const path = require('path')
const RawSource = require('webpack-sources')
const zip = new JSZip()

module.exports = class MyPlugin {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    console.log('My plugin is executed!')
    console.log('My plugin options', this.options)

    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      const folder = zip.folder(this.options.filename)

      for (let filename in compilation.assets) {
        console.log(compilation.assets[filename])
        const source = compilation.assets[filename].source()
        folder.file(filename, source)
      }

      zip.generateAsync({
        type: 'nodebuffer'
      }).then((content) => {
        // console.log(content)   
        // console.log(compilation.options)
        
        const outputPath = path.join(compilation.options.output.path, this.options.filename + '.zip')
        compilation.assets[outputPath] = new RawSource(content)
        callback()
      })
    })
  }
}