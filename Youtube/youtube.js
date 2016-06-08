var https = require('request');
var Promise = require('bluebird');

function toExecute() {
	var START_YEAR=2005, END_YEAR=2016, promiseArray=[];

	var results = {
		"basketball drills":{},
		"basketball training":{},
		"basketball lessons":{},
		"basketball personal training":{},
		"basketball workout":{}
	};

	function videoGetter(term,year) {
	    return new Promise(function (resolve) {
	    	https.get('https://www.googleapis.com/youtube/v3/search?part=snippet&q='+term+'&type=video&publishedBefore='+(year+1)+'-01-01T00:00:00Z&publishedAfter='+year+'-01-01T00:00:00Z&key=AIzaSyCaI8oHm6wF4mZPFjGyK1rCjA3AInHCChg',function(err,header,body){
			  results[term][year] = results[term][year] || 0;
			  results[term][year]+=JSON.parse(body).pageInfo.totalResults;
			  resolve(body);
			})
	    })
	};

	for (var key in results) {
		var toSearch = key.replace(" ","+");
		for (var j=START_YEAR;j<2016;j++){
			promiseArray.push(videoGetter(key,j));
		}
	}

	return Promise.all(promiseArray)
	.then(function(){
		return results;
	});
}

module.exports = toExecute;
