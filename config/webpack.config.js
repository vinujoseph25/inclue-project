"use strict";

const path = require("path");
const fs = require("fs");
const glob = require('glob')

const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
const WebpackRemoveEmptyScripts = require('webpack-remove-empty-scripts');
const Visualizer = require('webpack-visualizer-plugin');
const styleConfig = require('./webpack.styles.config');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const isLocal = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.TARGET_ENV === "DEV";
const isQA = process.env.TARGET_ENV === "QA";
const isDbgViz = ("DBG_VIZ" in process.env);

if (!isDbgViz) {
  //* prevent comments for webpack stats.json *
  console.log("isLocal " + isLocal);
  console.log("isProd " + isProd);
  console.log("is dev " + isDev);
  console.log("is qa " + isQA);
}

let dotenv;
if (isLocal && isQA) {
  dotenv = require("dotenv").config({
    path: "./config/.env.qa",
  });
} else if (isLocal && isDev) {
  dotenv = require("dotenv").config({
    path: "./config/.env.remote",
  });
}
else if (isLocal) {
  dotenv = require("dotenv").config({
    path: "./config/.env.local",
  });
}

const PREFIX = "REACT_APP_";
const ConfigReplaceToken = "{{RUNTIME_CONFIG}}";

function jsBundleRuntimeConfigEnvVarsAsJSON() {
  if (isLocal) {
    const config = {};

    Object.entries(process.env).forEach(([name, value]) => {
      if (name.startsWith(PREFIX)) {
        config[name.slice(PREFIX.length)] = value;
      }
    });

    return JSON.stringify(config);
  }
  return ConfigReplaceToken;
}

var bodyParser = require("body-parser");
const PATHS = {
  src: path.join(__dirname, 'src')
}

/** @type {webpack.Configuration} **/
module.exports = {
  entry: "./src/index.tsx",
  mode: isLocal ? "development" : "production",
  devtool: isLocal ? "inline-cheap-module-source-map" : "source-map", 
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    filename: isLocal ? '[name].js' : '[name].[contenthash].js'
  },
  devServer: {
    server: 'http',
    client: {
      overlay: {
        errors: true,
        warnings: false,
      }
    },
    static: resolveApp("public"),
    hot: true,
    allowedHosts: ['bs-local.com'],
  // Replace onBeforeSetupMiddleware with setupMiddlewares
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      devServer.app.use(bodyParser.json());
      devServer.app.use(
        bodyParser.urlencoded({
          extended: true,
        }),
      );
      return middlewares;
    },
  },
  module: {
    rules: [
      {
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: isLocal
          }
        },
        test: /\.(.js|jsx|mjs|ts|tsx)$/,
        exclude: /node_modules/,
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
        exclude: [/node_modules/, /build/, /__test__/],
      },
      ...styleConfig,
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader",
      },
      {
        test: /\.html$/,
        loader: "raw-loader",
      },
      {
        test: /\index.html$/,
        use: [
          {
            loader: "string-replace-loader",
            options: {
              search: ConfigReplaceToken,
              replace: jsBundleRuntimeConfigEnvVarsAsJSON(),
            },
          },
        ],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    /* ...(isProd && {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/].*\.js$/,
            priority: 2,
            name: 'vendor',
            enforce: true,
            chunks: 'all'
          },
          appStyles: {
            test: (module, chunks) => module.constructor.name === 'CssModule',
            name: "styles",
            chunks: "all",
            enforce: true
          }
        }
      },
      minimizer: [
        new TerserPlugin(),
        new CssMinimizerPlugin(),
      ],
    }) */
  },
  resolve: {
    extensions: [".mjs", ".ts", ".tsx", ".js"],
    modules: [path.resolve(__dirname), "node_modules", path.resolve(__dirname, "../"), path.resolve(__dirname, "../src")],
    plugins: [new TsconfigPathsPlugin({ configFile: "tsconfig.json" })],
    fallback: { "path": require.resolve("path-browserify") }
  },
  plugins: [
    new HtmlWebPackPlugin({ template: "public/index.html", favicon: "public/favicon.ico" }),
    new CopyWebpackPlugin({
      patterns:[
            { from: "src/assets", to: "public", noErrorOnMissing: true }
      ]
    }),
    new webpack.DefinePlugin({
      // "process.env.TARGET_ENV": JSON.stringify(process.env.TARGET_ENV),
      // "process.env.NODE_ENV": JSON.stringify('production'),
      "process.env": {
        NODE_ENV: '"' + process.env.NODE_ENV + '"',
        TARGET_ENV: '"' + process.env.TARGET_ENV + '"',
        ...(process.env.USE_CPTURL && { USE_CPTURL: process.env.USE_CPTURL }),
      },
    }),
    new WebpackManifestPlugin(),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /de|en-*/),
    new MiniCssExtractPlugin({
      filename: isLocal ? "[name].css" : "[name].[hash].css",
      ignoreOrder: true,
    }),
    new WebpackRemoveEmptyScripts(),
    new NodePolyfillPlugin()
  ]
};

if (isDbgViz) {
  module.exports.plugins.push(new Visualizer({
    filename: './dbg-viz.html'
  }));
}
