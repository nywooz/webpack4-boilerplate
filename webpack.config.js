const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const IS_DEV = process.env.NODE_ENV === "dev";

const config = {
  mode: IS_DEV ? "development" : "production",
  devtool: IS_DEV ? "cheap-module-eval-source-map" : "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js"
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  module: {
    rules: [
      {
        //  test: /\.(js|jsx)$/,
        test: /.jsx?$/, // Match both .js and .jsx
        exclude: /node_modules/,
        include: path.join(__dirname, "src"),
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: "../"
            }
          },
          {
            loader: "css-loader",
            options: { importLoaders: 1 }
          },
          "postcss-loader",

          "css-loader"
        ]
      },
      {
        test: /\.scss$/,
        use: IS_DEV
          ? [
              "style-loader",
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  sourceMap: true
                }
              },
              "postcss-loader",
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          : ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader!sass-loader" //Get all SASS code — .scss — using sass-loader and then convert it into CSS code using css-loader. Then take all that CSS code and inject it into our DOM with the <style> tag by using style-loader.
            })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "public/[name].[ext]?[hash:7]"
            }
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              mozjpeg: {
                progressive: true,
                quality: 75
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              attrs: [":data-src"],
              minimize: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional

      filename: IS_DEV ? "[name].css" : "[name].[hash].css",
      chunkFilename: IS_DEV ? "[id].css" : "[id].[hash].css"
    }),

    new CleanWebpackPlugin(["dist"]),

    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "windows.jQuery": "jquery"
    }),

    new CopyWebpackPlugin([
      {
        from: "./public",
        to: "public"
      }
    ]),

    new HtmlWebPackPlugin({
      template: "index.html",
      favicon: "./public/icon.ico",
      minify: !IS_DEV && {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true
      }
    }),

    new ExtractTextPlugin({
      filename: "style.[hash].css",
      disable: false,
      allChunks: true
    })
  ]
};

if (!IS_DEV) {
  config.plugins.push(
    new UglifyJsPlugin({
      sourceMap: false
    })
  );
}

module.exports = config;
