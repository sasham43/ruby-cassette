var cp = require('child_process');

var args = process.argv;

console.log('reading...');

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
  console.log(playlist)
  videos = playlist.split('\n');
  // videos = JSON.parse(playlist).playlist;
  // console.log('end.', playlist);
  // console.log('end.', playlist[0]);
  playlist = [];
  console.log('loading playlist urls...');
  videos.map(function(video){
    var url = cp.execSync('youtube-dl -g ' + video);
    playlist.push(url);
  });

  playlist.map(function(video, index){
    // console.log('video type:', video);
    console.log('playing', index + '...');
    video = video.toString().replace(/\r?\n|\r/g, ''); // remove line endings
    video_cmd = 'omxplayer \'' + video + '\'';
    cp.execSync(video_cmd);
  });
});
