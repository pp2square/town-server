/**
 * vote.js
 */

exports.push = function(req, resp) {
	console.log('push function() in vote.js');
	
	var num = req.param('num');
	
	console.log('Vote Number : ' + num);
	
	resp.send('Send done');
};