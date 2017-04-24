const http = require('http');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('port', process.env.PORT || 3000);

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}...`)
});
