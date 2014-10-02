/**
 * item.js in controllers
 */

var VoteItem = require('../Models/item.js');

exports.getItmes = function (req, resp) {

	var voteItem = new VoteItem();
		
	console.log('getItmes()');
	
	voteItem.voteID =1;
	voteItem.voteSubject ="가장 좋아하는 과일은?";
	voteItem.voteItems = [{"id": 1, "title":"바나나"}, {"id": 2, "title":"사과"}, {"id": 3, "title":"키위"},
	                  {"id": 4, "title":"수박"}, {"id": 5, "title":"파인애플"}, {"id": 6, "title":"딸기"}];

	var respData = JSON.stringify(voteItem);
	
	return respData;
	//resp.charset = 'utf-8';
	//resp.header("Access-Control-Allow-Origin", "*");
	//resp.json(voteItem);
};