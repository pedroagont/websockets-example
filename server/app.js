// ---------------> REQUIREMENTS
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');

// ---------------> SERVER SETUP
// express setup
const app = express();

// socket setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// ---------------> MIDDLEWARES
// custom logger
app.use((req, res, next) => {
  console.log(req.ip, req.method, req.url);
  next();
});

// ---------------> ROUTES
// home route
app.get('/', (req, res) => {
  res.send('Hello!');
});

// catch all route
app.use((req, res) => {
  res.send('Not found');
});

// ---------------> SOCKET EVENTS
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('start-recording', (data) => {
    console.log('data:', data);

    data &&
      fs.appendFile('data.csv', `${data.x}, ${data.y}\n`, function (err) {
        if (err) throw err;
        // console.log('Saved!');
      });
  });

  socket.on('store-data', () => {
    console.log('saved!');
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// ---------------> LISTENER
server.listen(3000, () => {
  console.log('listening on *:3000');
});
