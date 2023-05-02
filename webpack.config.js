const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const bundles = ['homework-7/undirected-graph', 'homework-7/directed-graph'];

module.exports = {
  mode: 'development',
  entry: bundles.reduce(
    (acc, name) => ({
      ...acc,
      [name]: `./src/${name}/index.ts`,
    }),
    {}
  ),
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
    path: path.resolve(__dirname, 'build'),
    filename: '[name]/bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
      watch: true,
    },
    port: 8001,
  },
  plugins: bundles.map((name) => {
    return new HtmlWebpackPlugin({
      inject: true,
      chunks: [name],
      template: `./src/${name}/index.html`,
      filename: `${name}/index.html`,
    });
  }),
};
