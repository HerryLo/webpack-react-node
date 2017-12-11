const path = require("path");
const merge = require("webpack-merge");
const BaseConfig = require("./webpack.config.base");

const Build_Path = path.resolve(__dirname, "./app/__build__/dist/static");
const ServerBuildPath = path.resolve(__dirname, "./server/dist");
const publicPath = "http://10.0.30.152:3505/static/";

module.exports = merge.multiple( BaseConfig,{
  client: {
    devtool: "source-map",
    output: {
      publicPath: publicPath, //https://www.tryfits.com/编译好的文件，在服务器的路径,域名会自动添加到前面
      path: Build_Path, //编译到当前目录
      filename: "./[name].js", //编译后的文件名字
      chunkFilename: "./[id].chunk.js"
    }
  },
  server: {
    devtool: "source-map",
    output: {
      publicPath: publicPath, //编译好的文件，在服务器的路径,域名会自动添加到前面
      path: ServerBuildPath,
      filename: "page.generated.js",
      libraryTarget: "commonjs2"
    }
  }
});
