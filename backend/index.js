const express = require('express');
var bodyParser = require('body-parser')
const app = express();

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  
require('./config/mongoose.js');

const http = require('http');
const server = http.createServer(app);

const group = require('./routes/group.js')
const message = require('./routes/message.js')
const user = require('./routes/user.js')


app.use('/api/user', user);
app.use('/api/group', group);
app.use('/api/message', message);

const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`Listening on port ${port}`));