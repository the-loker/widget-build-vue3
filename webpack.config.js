const webpack = require("webpack");
const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

const src = {
  dev: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist"),
};

module.exports = {
  mode: "development",
  target: "web",
  devtool: "source-map",
  entry: src.dev + "/script.js",
  output: {
    path: src.dist,
    filename: "script.js",
    publicPath: src.dist,
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: src.dev,
        loader: "babel-loader",
        options: {
          presets: [["@babel/preset-env", { modules: "umd" }]],
          plugins: ["add-module-exports"],
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          reactivityTransform: true,
        },
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
};
