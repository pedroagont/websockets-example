const socket = io('ws://localhost:3000');

let recording = false;

const handleMousePos = (e) => {
  console.log('mouse:', e.clientX, e.clientY);
  socket.emit('start-recording', {
    x: e.clientX,
    y: e.clientY,
  });
};

const button = document.getElementById('button');

button.addEventListener('click', function (e) {
  if (!recording) {
    e.target.innerHTML = 'Stop recording';
    recording = !recording;
    console.log('START RECORDING:');
    document.addEventListener('mousemove', handleMousePos);
  } else {
    e.target.innerHTML = 'Start recording';
    recording = !recording;
    console.log('STORING DATA:');
    socket.emit('store-data');
    document.removeEventListener('mousemove', handleMousePos);
  }
});
