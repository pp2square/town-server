/**
 * router.js
 */

var admin = require('./admin/main.js');
var vote = require('./controllers/vote.js');

exports.route = function (app) {
	app.get('/list-voteData', vote.getVotesData);
	app.get('/list-voteItems', vote.getVotesItems);
	//app.get('/menus', main.getMenus);
	//app.get('/menu/:menu_id', main.getMenu);
	//app.get('/tables/:table_id', main.getTableId);
	
	app.post('/vote', vote.setVote);
	app.post('/item', vote.setItems);
	app.post('/update-status', vote.startEndVote);
	//app.options('/vote', vote.setVote);
	//app.options('/item', vote.setItems);
	
	//app.post('/menu/', main.setMenu);
	//app.put('/menu/:menu_id', main.updateMenu);
	//app.del('/menus', main.deleteMenus);
};