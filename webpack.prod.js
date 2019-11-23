
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjectPlugin = require('html-webpack-inject-plugin').default;

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
        }),
        new HtmlWebpackInjectPlugin({
          externals: [
            {
              tag: 'script',
              attrs: {
                src: './src/app/libs/aframe.min.js',
                type: 'text/javascript'
              }
            },
            {
              tag: 'script',
              attrs: {
                src: './src/app/libs/aframe-ar.min.js',
                type: 'text/javascript'
              }
            }
          ],
          parent: 'head', // default is head
          prepend: true // default is false
        })
    ],
    node: {fs: 'empty'}, 
};
