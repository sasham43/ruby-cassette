var cp = require('child_process');

var args = process.argv;

console.log('writing...');

var playlist_file = 'playlist2.txt';
var cmd = 'ruby';
var r_args = [
  './tape-write.rb',
  '<',
  playlist_file
];

// for (var i = 0; i < 300 ; i++){
//   // var tape = cp.spawn(cmd, r_args);
//     cp.spawnSync(cmd, r_args);
//
//     setTimeout(function(){
//       console.log('in a timeout...', 3000)
//     },2000)
// }


setInterval(function(){
  // cp.spawnSync(cmd, r_args);
  cp.execSync(r_args.join(' '))
},1000)

//
// setTimeout(function(){
//   console.log('thing')
// },3000)
