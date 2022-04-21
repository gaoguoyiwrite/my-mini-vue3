const path = require('path')

module.exports = {
  mode: 'development',
  devtool: false,
  // devtool: 'inline-cheap-source-map',
  entry: './src/index.js',
  output: {
    filename: 'mini-vue.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    // library: 'MiniVue',
    // libraryTarget: 'umd'
  },
  devServer:{
    static: {
      directory: '.index.html',
    },
    compress: true,
    port: 9000,
  },
};