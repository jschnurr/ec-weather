const path = require("path");

module.exports = {
  entry: "./src/index.js",
  resolve: {
    fallback: {
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer/"),
      timers: require.resolve("timers-browserify"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          { loader: "eslint-loader" },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  externals: ["axios"],
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "ec-weather.js",
    library: "ecWeather",
    libraryTarget: "umd",
    libraryExport: "default",
    globalObject: "this",
  },
};
