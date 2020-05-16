const path = require("path");

const commonConfig = {
  entry: "./src/ec-weather.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};

const serverConfig = {
  ...commonConfig,
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "ec-weather.js",
  },
};

const clientConfig = {
  ...commonConfig,
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "ec-weather.browser.js",
  },
};

module.exports = [serverConfig, clientConfig];
