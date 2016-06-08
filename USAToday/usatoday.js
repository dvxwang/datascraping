var Promise = require('bluebird');
var Xray = require('x-ray');
var xray = Xray();

var schoolData={};

function toExecute() {
	function xRaySchoolGetter() {
	    return new Promise(function (resolve) {
	    	xray('http://sports.usatoday.com/ncaa/finances/', '#sports-table-scroll-dom tbody', ['tr td.left a@data-passid'])(function(err,res){
				resolve(res);
			})
	    })
	};

	function xRayFinanceGetter(id) {
	    return new Promise(function (resolve) {
	    	xray('http://sports.usatoday.com/ajaxservice/ncaa/finances__school__'+id, '.Expenses', ['tr td.left'])(function(err,res){
				for (var j=0;j<res.length;j+=2){
					schoolData[res[j]]=schoolData[res[j]] || 0;
					schoolData[res[j]]+= Number(res[j+1].replace(/\$|,/g,""));
				}
				resolve(res);
			})
	    })
	};

	return xRaySchoolGetter()
	.then(function(list){
		var pArray=[];
		for (var i=0;i<list.length;i++){
			pArray.push(xRayFinanceGetter(list[i]));
		}
		return Promise.all(pArray);
	})
	.then(function(){
		return schoolData;
	});
}

module.exports = toExecute;