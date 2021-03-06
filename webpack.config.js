var path = require('path')
var webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const WebpackMd5Hash = require('webpack-md5-hash')
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = {
  entry: {
    build: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './',
    filename: 'js/[name]_[hash].js',
    chunkFilename: 'js/[name]_[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
             less: ExtractTextPlugin.extract({
              use: 'css-loader!less-loader',
              fallback: 'vue-style-loader' 
            })
          }
        }
      },
      {
        test: /\.less$/,
        loader: 'css-loader!less-loader',
        exclude: /node_modules/
      }, 
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader?name=img/[name]_[hash].[ext]'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          root: path.resolve(__dirname, 'dist')
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new CleanWebpackPlugin('./dist/'),
    new WebpackMd5Hash(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'lottery-ticket',
      template: './src/index.html'
    }),
    new ExtractTextPlugin('main_[chunkhash].css'),
    new ImageminPlugin({
      test: 'src/assets/img/**',
      disable: process.env.NODE_ENV !== 'production', // Disable during development 
      pngquant: {
        quality: '95-100'
      },
      optipng: {
        optimizationLevel: 9
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    publicPath: "/"
    // host:'192.168.0.102'
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
