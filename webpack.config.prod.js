const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = [
  {
  // Browser output -> UMD
    entry: './src/ec-weather.js',
    module: {
      rules: [
      // rules for modules (configure loaders, parser options, etc.)
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, 'src'),
          ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              plugins: [
                ['babel-plugin-transform-runtime', { polyfill: false }],
                ['add-module-exports'], // handle es6 default export
              ],
            },
          },
        },
      ],
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new UglifyJsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ],
    output: {
      filename: 'ec-weather.browser.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'ecWeather',
      libraryTarget: 'umd',
    },
  },

  {
    // Node output -> CommonJS
    entry: './src/ec-weather.js',
    target: 'node',
    externals: [nodeExternals()], // don't bundle modules in node_modules folder
    module: {
      rules: [
        // rules for modules (configure loaders, parser options, etc.)
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, 'src'),
          ],
          use: {
            loader: 'babel-loader', // uses .babelrc
          },
        },
      ],
    },
    plugins: [
      new UglifyJsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ],
    output: {
      filename: 'ec-weather.node.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'ecWeather',
      libraryTarget: 'commonjs2',
    },
  },
];
