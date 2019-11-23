
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/app/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: 'vendor.bundle.js',
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            //IMAGE LOADER
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: {
              loader:'file-loader',
              options: {
              }
            }
          },
          {
            // HTML LOADER
            test: /\.html$/,
            use:[
              'html-loader'
            ]
          },
          {
            test: /\.patt$/,
            use: [
              'file-loader',
            ]
          },
          {
            test: /\.dat$/,
            use: [
              'file-loader',
            ]
          }
        ]
      },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "AR bundle",
            template: "./src/templates/index.html",
            filename: "./../index.html"
        })
    ],
    node: {fs: 'empty'}, 
};
