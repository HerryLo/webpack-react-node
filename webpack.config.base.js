const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //生成html

const Root_Path = path.resolve(__dirname);
const App_Path = path.resolve(Root_Path, "./app/src");
const App_File = path.resolve(App_Path, "./app.js");
const Server_File = __dirname + "/./server/page.js";

module.exports = {
  client: {
    entry: {
      app: App_File //就是这个名字
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: "babel-loader",
          exclude: /^node_modules$/,
          include: [App_Path]
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: ["css-loader"],
            publicPath: "./"
          }),
          //exclude: /^node_modules$/,
          include: [App_Path]
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: "url-loader?limit=8192&name=images/[hash:8].[name].[ext]",
          //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
          exclude: /^node_modules$/,
          include: [App_Path]
        },
        {
          test: /\.jsx?$/,
          loaders: "babel-loader",
          exclude: /^node_modules$/,
          include: [App_Path]
        }
      ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: "common",
        filename: "./common.js"
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production") //定义编译环境
        }
      }),
      new HtmlWebpackPlugin({
        filename: "../index.html", //生成的html存放路径，相对于 path
        template: __dirname + "/./app/src/index.html", //html模板路径
        hash: false
      }),
      new ExtractTextPlugin("./[name].css") //你已经把哪个global的css打包到这个【name】。css里了   这个name就是entry的名字
    ],
    resolve: {
      extensions: [".js", ".jsx", ".less", ".scss", ".css"] //后缀名自动补全
    }
  },
  server: {
    target: "node",
    node: {
      __filename: true,
      __diraname: true
    },
    entry: ["babel-polyfill", Server_File],
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader",
            publicPath: "../"
          }),
          exclude: /^node_modules$/,
          include: [App_Path]
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: "url-loader?limit=8192&name=images/[hash:8].[name].[ext]",
          //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
          exclude: /^node_modules$/,
          include: [App_Path]
        },
        {
          test: /\.jsx?$/,
          loaders: "babel-loader",
          exclude: /^node_modules$/
        }
      ]
    },
    resolve: {
      extensions: [".js", ".jsx", ".less", ".scss", ".css"] //后缀名自动补全
    },
    plugins: [
      new ExtractTextPlugin("[name].css") //你已经把哪个global的css打包到这个【name】。css里了   这个name就是entry的名字
    ]
  }
};
