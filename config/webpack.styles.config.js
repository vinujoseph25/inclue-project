const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssLoader = {
  loader: require.resolve("css-loader"),
  options: {
    importLoaders: 1,
  },
}

const sassResourcesLoader = {
  loader: "sass-resources-loader",
  options: {
    resources: [
      /* make helpers/styles global */
      // path.resolve(__dirname, "../src/styles/base/color.scss"),
      // path.resolve(__dirname, "../src/styles/helpers/_index.scss"),
      path.resolve(__dirname, "../src/styles/base/color.scss"),
    ],
  },
}

module.exports = [{
  test: /\.scss$/i,
  use: [
    require.resolve("style-loader"),
    { ...cssLoader, options: { importLoaders: 1, modules: { localIdentName: '[name]__[local]--[hash:base64:5]', auto: true } } },
    require.resolve("sass-loader"),
    sassResourcesLoader
  ],
  include: /\.module\.scss$/,
},
{
  test: /\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    cssLoader,
  ],
  exclude: /\.module\.css$/
},
{
  test: /\.(scss)$/,
  use: [
    MiniCssExtractPlugin.loader,
    cssLoader,
    require.resolve("resolve-url-loader"),
    require.resolve("sass-loader"),
    sassResourcesLoader,
  ],
  exclude: /\.module\.scss$/
}]