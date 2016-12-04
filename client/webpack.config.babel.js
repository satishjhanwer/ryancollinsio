/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');

const ROOT_PATH = path.resolve(__dirname);

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:1337',
    'webpack/hot/only-dev-server',
    path.resolve(ROOT_PATH, 'app/src/index'),
  ],
  output: {
    path: path.resolve(ROOT_PATH, 'app/build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    noParse: /\.elm$/,
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: path.resolve(ROOT_PATH, './app')
      },
      {
        test: /\.elm$/,
        loader: 'elmx-webpack-preloader',
        include: [path.join(__dirname, 'app/src/elm/src')],
        query: {
          sourceDirectories: ['app/src/elm/src'],
          outputDirectory: 'app/src/elm/.tmp/elm'
        }
      }
    ],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel']
    },
    {
      test:    /\.elm$/,
      exclude: [/elm-stuff/, /node_modules/],
      include: [path.join(__dirname, "/app/src/elm/src"), path.join(__dirname, "app/src/elm/.tmp/elm")],
      loader:  'elm-hot!elm-webpack?verbose=true&warn=true&debug=true'
    },
    {
      test: /\.svg$/,
      loader: 'babel!svg-react'
    },
    {
      test: /\.md$/,
      loader: "html!markdown"
    },
    {
      test: /\.json$/,
      loader: 'json'
    },
    {
      test: /\.inline\.scss$/,
      loader: 'isomorphic-style-loader!css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!resolve-url-loader!postcss-loader!sass-loader'
    },
    {
      test: /\.module\.scss$/,
      loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!resolve-url-loader!postcss-loader!sass-loader'
    },
    {
      test: /\.scss$/,
      exclude: [/\.inline\.scss$/, /\.module\.scss$/],
      loader: 'style-loader!css-loader!postcss-loader!sass-loader'
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },
    {
      test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
      loader: 'url-loader?mimetype=application/font-woff'
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9].[0-9].[0-9])?$/,
      loader: 'file-loader?name=[name].[ext]'
    },
    {
      test: /\.(jpg|png)$/,
      loader: 'file?name=[path][name].[hash].[ext]'
    }
  ]
  },
  sassLoader: {
    includePaths: [
      './node_modules',
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.elm'],
    alias: {
      components: path.resolve(ROOT_PATH, 'app/src/components'),
      containers: path.resolve(ROOT_PATH, 'app/src/containers'),
      pages: path.resolve(ROOT_PATH, 'app/src/pages'),
      fragments: path.resolve(ROOT_PATH, 'app/src/fragments'),
      elm: path.resolve(ROOT_PATH, 'app/src/elm'),
    },
  },
  postcss: function () {
    return {
      defaults: [precss, autoprefixer],
      cleaner:  [autoprefixer({ browsers: [] })]
    };
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new NpmInstallPlugin(),
    new HtmlwebpackPlugin({
      title: 'RyanCollins.io',
      template: 'config/templates/_index.dev.html',
    }),
  ],
};
