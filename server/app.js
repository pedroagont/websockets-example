const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

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

server.listen(3000, () => {
  console.log('listening on *:3000');
});
