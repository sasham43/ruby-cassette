var cp = require('child_process');

var args = process.argv;

console.log('args:', args);

if(args[2] === '-v'){
  var cmd = 'ruby tape-read.rb | omxplayer pipe:0';
} else if (args[2] === '-y'){
  var cmd = 'ruby tape-read.rb';
}

var tape = cp.spawn(cmd);

tape.stdout.on('data', (data) => {
  console.log('data:', data);
});
tape.stderr.on('error', (error) => {
  console.log('error:', error);
});
tape.stdout.on('end', () =>{
  console.log('end.');
});
