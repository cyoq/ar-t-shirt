
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjectPlugin = require('html-webpack-inject-plugin').default;



module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: path.resolve(__dirname, 'src/app/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: 'vendor.bundle.js',
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
      inject:'head',
    }),
    new HtmlWebpackInjectPlugin({
      externals: [
        // {
        //   tag: 'script',
        //   attrs: {
        //     src: './app/libs/aframe.min.js',
        //     type: 'text/javascript'
        //   }
        // },
        {
          tag: 'script',
          attrs: {
            src: './app/libs/aframe-ar.min.js',
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
