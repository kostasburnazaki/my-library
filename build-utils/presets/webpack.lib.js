module.exports = () => ({
  output: {
    globalObject: 'this',
    library: {
      name: 'myLibrary',
      type: 'umd',
    },
    libraryTarget: 'commonjs'
  },
})