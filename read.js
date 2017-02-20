var cp = require('child_process');

var args = process.argv;

console.log('args:', args);

// if(args[2] === '-v'){
//   var cmd = 'ruby tape-read.rb | omxplayer pipe:0';
// } else if (args[2] === '-y'){
//   var cmd = 'ruby tape-read.rb';
// }

var cmd = 'ruby';
var r_args = [
  'tape-read.rb'
];

var tape = cp.spawn(cmd, r_args);

tape.stdout.on('data', function(data) {
  console.log('data:', data);
});
tape.stderr.on('error', function(error) {
  console.log('error:', error);
});
tape.stdout.on('end', function(){
  console.log('end.');
});
