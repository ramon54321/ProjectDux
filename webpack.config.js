const path = require('path')
const fs = require('fs')

const entryFilenames = fs.readdirSync(path.resolve('src', 'services', 'frontend', 'bundles'))
const entryMap = entryFilenames.reduce((map, filename) => {
  const bundleName = path.basename(filename).split('.')[0]
  map[bundleName] = path.resolve('src', 'services', 'frontend', 'bundles', filename)
  return map
}, {})

module.exports = {
  entry: entryMap,
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/services/frontend/bundles'),
  },
}
