# webpack-react-node

前端代码的不断增大，页面加载渲染时长不断增加。node服务段渲染完美的解决了这个问题。将页面在服务段渲染完成，用户等待时间缩短，极大的提升了用户体验。

## stack

基于react的服务端渲染：

  * react@15.0 
  * react-router@3.0 
  * ejs template
  * fetch request
  * node middle

## install
```
// 安装依赖
$ npm install 

// webpack打包
$ npm run dev 

// 开启本地node服务
$ npm run server 
```

after server start，open [http://localhost:3505](http://localhost:3505) 访问
