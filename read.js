var cp = require('child_process');

var args = process.argv;

console.log('args:', args);

if(args[2] === '-v'){
  var cmd = 'ruby tape-read.rb | omxplayer pipe:0';
} else if (args[2] === '-y'){
  var cmd = 'ruby tape-read.rb';
}

var tape = cp.exec(cmd, function(err, stdout, stderr){
  if(err)
    return console.log('err:', err);

  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
});

// tape.stdout.on('data', (data) => {
//   cp.exec('omxplayer ')
// });
