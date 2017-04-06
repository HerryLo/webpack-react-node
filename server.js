/*eslint-disable no-console, no-var */
var express = require('express')
var webpack = require('webpack')
var WebpackConfig = require('./webpack.config.dev')
var path = require('path');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackDevMiddleware = require('webpack-dev-middleware');
var compiler = webpack(WebpackConfig);
var app = express()

// app.use(webpackDevMiddleware(webpack(WebpackConfig), {
//   publicPath: '/__build__/dist/',
//   stats: {
    // colors: true,
    // historyApiFallback:true,
    // inline:true ,  //实时刷新
    // hot:true
//   }
// }))

app.use(webpackDevMiddleware(webpack(WebpackConfig)));
app.use(webpackHotMiddleware(webpack(WebpackConfig), {
    publicPath: WebpackConfig.output.publicPath,
    stats: {
        colors: true,
		    historyApiFallback:true,
		    inline:true ,  //实时刷新
		    hot:true
    },
    quiet: true,
}));
var buildPath = "./__build__";
app.use(express.static(path.resolve(__dirname,buildPath)));//设置静态文件目录
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname,buildPath,'./index.html'));
});

app.listen(8111, function () {
  console.log('Server listening on http://localhost:8111, Ctrl+C to stop')
})
