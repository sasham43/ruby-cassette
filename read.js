var cp = require('child_process');

cp.exec('./tape-read.rb', function(err, stdout, stderr){
  if(err)
    return console.log('err:', err);

  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
});
