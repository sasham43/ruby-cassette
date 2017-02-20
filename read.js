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
var playlist = '';

tape.stdout.on('data', function(data) {
  // console.log('data:', data.toString());
  playlist += data.toString();
});
tape.stderr.on('error', function(error) {
  console.log('error:', error);
});
tape.stdout.on('end', function(){
  playlist = JSON.parse(playlist);
  console.log('end.', playlist);
  console.log('end.', playlist[0]);

  var youtube_dl = cp.exec('youtube_dl' ['-g', playlist[0]], function(err, stdout, stderr){
    if(err){
      console.log('err:', err);
    } else {
      console.log('out:', stdout);
    }
  });

});
