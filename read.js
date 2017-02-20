var cp = require('child_process');

var tape = cp.exec('ruby tape-read.rb | omxplayer pipe:0', function(err, stdout, stderr){
  if(err)
    return console.log('err:', err);

  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
});

// tape.stdout.on('data', (data) => {
//   cp.exec('omxplayer ')
// });
