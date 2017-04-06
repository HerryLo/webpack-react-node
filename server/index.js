const express = require("express");
const path = require("path");
const page = require("./dist/page.generated.js");

const app = express();

app.set('view engine', 'ejs');
app.use('/static', express.static(__dirname + '/../app/__build__/dist/static'));

app.set('views', path.join(__dirname, '../app'));

app.get("*", page);

const server = app.listen(3505, function () {
  console.log('Listening on port %d', server.address().port);
});
