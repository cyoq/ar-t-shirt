
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjectPlugin = require('html-webpack-inject-plugin').default;
const HtmlWebpackInjector = require('html-webpack-injector');
const CopyPlugin = require('copy-webpack-plugin');
const UglifyJS = require("uglify-es");

module.exports = {
    mode: 'production',
    entry: {
      main: path.resolve(__dirname, 'src/js/index.js'),
      aframe_head: path.resolve(__dirname, 'src/js/aframe_import.js')
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      chunkFilename: '[name].vendor.bundle.js',
      publicPath: 'dist/',
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
                outputPath: "assets/images/" 
              }
            }
          },
          {
            // HTML LOADER
            test: /\.html$/,
            use:{
              loader: 'html-loader',
              options: {
                interpolate: true,
              }
            } 
          },
          {
            test: /\.patt$/i,
            use: {
              loader: 'file-loader',
              options: {
                outputPath: "assets/patterns/" 
              }
            }
          },
          {
            test: /\.glb$/i,
            use: {
              loader: 'file-loader',
              options: {
                outputPath: "assets/models/"
              }
            }
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
            filename: "./../index.html",
            inject: true,
        }),
        new HtmlWebpackInjector(),
        new CopyPlugin([
          { 
            from: './src/js/libs/', 
            to: './libs/', 
            transform: function (content, path) {               
              return UglifyJS.minify(content.toString()).code;  
            },    
          },
        ]),
        new HtmlWebpackInjectPlugin({
          externals: [
            {
              tag: 'script',
              attrs: {
                src: './dist/libs/aframe-ar.js',
                type: 'text/javascript'
              }
            }
          ],
          parent: 'head', // default is head
          prepend: false // default is false
        })
    ],
    node: {fs: 'empty'}, 
};
