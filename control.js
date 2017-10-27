var cp = require('child_process');

var args = process.argv;

var cmd = 'ruby';
var r_args = [
  'tape-read.rb'
];

listen();

function listen(){
console.log('listening...');
  var tape = cp.spawn(cmd, r_args);
  var playlist = '';

  tape.stdout.on('data', function(data) {
    playlist += data.toString();
  });
  tape.stderr.on('error', function(error) {
    console.log('error:', error);
  });
  var _ = require('underscore');
  var q = require('q');
  var inquirer = require('inquirer');
  tape.stdout.on('end', function(){
      console.log('playlist',playlist);

      videos = playlist.split('\n');
      console.log('loading urls...');
      var url_promises = [];

      // get urls that omxplayer can play
      videos.forEach(function(video){
        var quote_re = /\"/g;
        video = video.replace(quote_re, '');
        video = video.toString().replace(/\r?\n|\r/g, ''); // remove line endings
        console.log('video', video.length);

        if((video.includes("https://www.youtube.com") && (video.length == 43))){
          // var get_url = 'youtube-dl -f mp4 -g ' + video;
          // var get_title = 'youtube-dl -e ' + video;
          //
          // var url_promise = q.ninvoke(cp, 'exec', get_url);
          // var title_promise = q.ninvoke(cp, 'exec', get_title);
          // url_promises.push(url_promise);
          // url_promises.push(title_promise);
          var request = 'youtube-dl -e -f mp4 -g ' + video;
          var promise = q.ninvoke(cp, 'exec', request);
          url_promises.push(promise);
        }
      });

      // build playlist, open inquirer, play video
      q.allSettled(url_promises).then(function(responses){

        if(responses.length > 0){
          console.log('responses:', responses);
          var playlist = [];
          var choices = [];

          var item = {};

          responses.forEach(function(r,i){
            if(r.state == 'fulfilled'){
              var item = {
                title: '',
                url: ''
              };
              // var values = r.value.split('\n');
              r.value.forEach(function(v){
                if(v != ''){
                  var values = v.split('\n');
                  values.forEach(function(value){
                    if(value.includes('http')){
                      item.url = value.toString().replace(/\r?\n|\r/g, '');
                    } else if(value.length > 4){
                      item.title = value.toString().replace(/\r?\n|\r/g, '');
                      choices.push(value.toString().replace(/\r?\n|\r/g, ''));
                    }
                  });
                }
              });
              playlist.push(item);
            }
          });

          console.log('choices:', choices);
          console.log('playlist:', playlist);

          inquirer.prompt({
            type: 'list',
            name: 'song',
            message: 'play a video',
            choices: choices
          }).then(function(answers){
            console.log('answers:', answers);

            var song = _.find(playlist, function(p){
              return p.title == answers.song;
            });

            cp.exec('omxplayer \'' + song.url + '\'');
          }).catch(function(err){
            console.log('failed at erroring:', err);
          });
        } else {
          listen();
        }
    })
    .catch(function(err){
      console.log('did an oopsie:', err);
    });
  });
}
