var q = require('q');
var _ = require('underscore');
var cp = require('child_process');

var get_url = 'youtube-dl -f mp4 -g https://www.youtube.com/watch?v=wcV1UpZAWAc';
var get_title = 'youtube-dl -e https://www.youtube.com/watch?v=wcV1UpZAWAc';

var url_promise = q.ninvoke(cp, 'exec', get_url);
var title_promise = q.ninvoke(cp, 'exec', get_title);

q.allSettled([
  url_promise,
  title_promise
]).then(function(data){
  console.log('data', data);
}).catch(function(e){
  console.log('yeah i guess:',e)
})
