const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    minimizer: [new TerserJSPlugin({})],
  },
  entry: './src/consented_scripts.coffee',
  output: {
    filename: 'consented_scripts.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.coffee$/,
        exclude: /node_modules/,
        loader: "coffee-loader",
        options: {
          transpile: {
            presets: ['env']
          }
        }
      }
    ]
  },
};
