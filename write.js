var cp = require('child_process');

var args = process.argv;

console.log('listening...');

var cmd = 'ruby';
var r_args = [
  'tape-write.rb'
];

var playlist_file = 'playlist2.txt';

var tape = cp.spawn(cmd, r_args);
