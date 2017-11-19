const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
  // Browser output -> UMD
    entry: './src/ec-weather.js',
    devtool: 'inline-source-map',
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
        {
          test: /\.js$/,
          include: /src/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
          // eslint options (if necessary)
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
    devtool: 'inline-source-map',
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
    output: {
      filename: 'ec-weather.node.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'ecWeather',
      libraryTarget: 'commonjs2',
    },
  },
];
