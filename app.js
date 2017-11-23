/*module.exports = function(){
    return 'hello';
}*/

const R = require('ramda');

module.exports = {
    sayHello: function(){
        return 'hello';
    },

    addNumbers: function(value1, value2){
        return value1 + value2;
    },

    getViews: function(youtubeVideos){
        youtubeVideos = youtubeVideos.filter(video => 'views' in video);

        let results = [];

        for(let i = 0; i < youtubeVideos.length; i++){
            results.push(youtubeVideos[i].views);
        }
        console.log(results);
        return results;
    },

    getViews2: function(youtubeVideos){
        youtubeVideos = youtubeVideos.filter(video => 'views' in video);

        youtubeVideos = youtubeVideos.map(video => video.views);
        return youtubeVideos;
    },

    getViews3: function(youtubeVideos){
        return youtubeVideos
            .filter(video => 'views' in video)
            .map(video => video.views);
    },

    getViews4: function(youtubeVideos){
        return R.pipe(
            R.filter(video => 'views' in video),
            R.map(video => video.views)
        )(youtubeVideos);
    },
    getViews4: function(youtubeVideos){
        return R.pipe(
            R.filter(R.has('views')),
            R.map(R.prop('views'))
        )(youtubeVideos);
    },

    
}