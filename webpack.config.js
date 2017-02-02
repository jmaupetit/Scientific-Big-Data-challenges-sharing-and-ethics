const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ROOT = path.resolve(__dirname);
const APP = path.join(ROOT, 'app');

const config = {
  context: APP,
  entry: {
    app: path.join(APP, 'index.js'),
  },
  output: {
    path: 'dist/',
    publicPath: '/',
    filename: 'js/app.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loaders: ['file-loader?name=[path][name].[ext]&context=./app'],
        include: APP,
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader?name=[name].[ext]&outputPath=img/',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyWebpackPlugin([
      {
        from: 'slides.md',
      },
      {
        from: 'index.html',
      },
      {
        context: path.join(ROOT, 'node_modules'),
        from: 'reveal.js/lib/js/classList.js',
        to: 'js/vendor/reveal.js/'
      },
      {
        context: path.join(ROOT, 'node_modules'),
        from: 'reveal.js/plugin/markdown/marked.js',
        to: 'js/vendor/reveal.js/'
      },
      {
        context: path.join(ROOT, 'node_modules'),
        from: 'reveal.js/plugin/markdown/markdown.js',
        to: 'js/vendor/reveal.js/'
      },
      {
        context: path.join(ROOT, 'node_modules'),
        from: 'reveal.js/plugin/highlight/highlight.js',
        to: 'js/vendor/reveal.js/'
      },
    ]),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        sassLoader: {
          includePaths: [path.join(ROOT, 'node_modules/reveal.js/css/theme')],
        },
      },
    }),
  ],
  devServer: {
    contentBase: APP,
    hot: true,
    port: 8000,
  },
};

module.exports = config;
