const http = require('http');
const connect = require('connect');
const serveStatic = require('serve-static');
// var cors = require('cors');
let app = connect();

app.use(serveStatic('.'));
// app.use(cors());

http.createServer(app).listen(8080, function(){
  // eslint-disable-next-line no-console
  console.log('Server running on 8080...');
});