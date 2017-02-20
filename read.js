var cp = require('child_process');

var args = process.argv;

console.log('reading...');

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
  videos = JSON.parse(playlist).playlist;
  // console.log('end.', playlist);
  // console.log('end.', playlist[0]);
  playlist = [];
  console.log('loading playlist urls...');
  videos.map(function(video){
    var url = cp.execSync('youtube-dl -g ' + video);
    playlist.push(url);
  });

  playlist.map(function(video, index){
    console.log('video type:', video);
    console.log('playing', index + '...');
    video = video.toString().replace(/\r?\n|\r/g, ''); // remove line endings
    video_cmd = 'omxplayer \'' + video + '\'';
    cp.execSync(video_cmd);
  })

  // var youtube_dl = cp.exec('youtube-dl -g ' + playlist[0], function(err, url, stderr){
  //   if(err){
  //     console.log('err:', err);
  //   } else {
  //     // console.log('out:', url);
  //     // replace line endings
  //     url = url.replace(/\r?\n|\r/g, '');
  //
  //     var omx_cmd = 'omxplayer \'' + url + '\'';
  //     console.log('omx_cmd:', omx_cmd);
  //
  //     var omxplayer = cp.exec(omx_cmd, function(err, stdout, stderr){
  //       if(err){
  //         console.log('err omx:', err);
  //       } else {
  //         console.log('stdout:', stdout);
  //       }
  //     });
  //   }
  // });

});
