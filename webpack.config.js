const webpack = require('webpack');
const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProd = process.env.NODE_ENV === 'production';
const src = {
  dev: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

function extractStyles(isProd) {
  return isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader';
}

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: 'source-map',
  entry: src.dev + '/widget.js',
  output: {
    path: src.dist,
    filename: 'widget.js',
    publicPath: src.dist,
    library: {
      type: 'umd',
    },
  },
  externals: {
    jquery: 'jquery',
  },
  optimization: {
    minimize: isProd,
    usedExports: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: src.dev,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env']],
          plugins: [
            'add-module-exports',
            '@babel/plugin-syntax-dynamic-import',
          ],
        },
      },
      {
        test: /\.vue$/,
        include: src.dev,
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          reactivityTransform: false,
        },
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: [extractStyles(isProd), 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: !isProd,
    }),
    new VueLoaderPlugin(),
    new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
  ],
};
