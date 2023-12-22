const p = process.env.NODE_ENV === 'production'
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(__dirname, 'src/scripts/app.js')
  ],
  output: {
    path: path.join(__dirname, 'src/assets'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        loader: 'standard-loader',
        include: path.join(__dirname, '/src/scripts'),
        exclude: [
          /node_modules/,
          path.join(__dirname, 'src/scripts/sections'),
          path.join(__dirname, 'src/scripts/templates'),
          path.join(__dirname, 'src/scripts/slate')
        ],
        include: path.join(__dirname, 'src/scripts'),
        options: {
          parser: 'babel-eslint'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src/scripts'),
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules|assets/,
        include: path.join(__dirname, 'src/styles'),
        use: p ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'postcss-loader'
            ]
        }) : [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      }
    ],

    loaders: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader', {
            loader: 'image-webpack-loader',
            options: {
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // Specifying webp here will create a WEBP version of your JPG/PNG images
              webp: {
                quality: 75
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      micromanagerRoot: path.join(__dirname, 'src/scripts'),
      slater: path.join(__dirname, 'src/scripts/', 'slater'),
      components: path.join(__dirname, 'src/scripts/', 'components'),
      pages: path.join(__dirname, 'src/scripts/', 'pages'),
      templates: path.join(__dirname, 'src/scripts/', 'templates'),
      lib: path.join(__dirname, 'src/scripts/', 'lib'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      ROOT_PATH: JSON.stringify(path.join(__dirname, '/src/scripts')) // for init.js
    }),
    new ExtractTextPlugin('main.css'),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common',
    //   filename: 'common.js',
    //   minChunks: Infinity
    // })
  ]
}
