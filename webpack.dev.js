
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjectPlugin = require('html-webpack-inject-plugin').default;
const HtmlWebpackInjector = require('html-webpack-injector');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: path.resolve(__dirname, 'src/js/index.js'),
    aframe_head: path.resolve(__dirname, 'src/js/aframe_import.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].vendor.bundle.js',
    publicPath: '/',
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
          loader: 'file-loader',
          options: {
            outputPath: "assets/images/"
          }
        }
      },
      {
        // HTML LOADER
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              interpolate: true,
            }
          }
        ],

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
  devServer: {
    https: true,
    hot: true,
    contentBase: "./src/",
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    publicPath: '/',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "AR bundle",
      template: "./src/templates/index.html",
    }),
    new HtmlWebpackInjector(),
    
    new HtmlWebpackInjectPlugin({
      externals: [
        {
          tag: 'script',
          attrs: {
            src: './js/libs/aframe-ar.js',
            type: 'text/javascript'
          }
        }

      ],
      parent: 'head', // default is head
      prepend: false // default is false
    }),
  ],
  node: { fs: 'empty' },
};
