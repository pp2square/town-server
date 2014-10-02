/**
 * vote.js in controllers
 */

var VoteData = require('../Models/vote.js');
var VoteItem = require('../Models/item.js');

Date.prototype.yyyymmdd = function() {         
    
    var yyyy = this.getFullYear().toString();                                    
    var mm = (this.getMonth()+1).toString();         
    var dd  = this.getDate().toString();             
                        
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
};  

exports.setItems = function(req, resp) {
	var voteItem = new VoteItem();
	
	console.log('setItems()');
	
	voteItem = JSON.parse(req.body.json);
	
	voteItem.itemStatus = "Not Yet";
	voteItem.voteDate = new Date().yyyymmdd();
	
	console.log(voteItem);

	new VoteItem(voteItem).save(function (err, saveItem) {
		if(err) {
			console.log('VoteItem.save() Error');
			return;
		}
		
		console.log('new VoteItem Saved');
	});

	resp.send(200);
};

exports.setVote = function (req, resp) {

	var voteData = new VoteData();
	
	console.log('setVote()');

	console.log(req.body);

	voteData = req.body;
	
	console.log('device_id : ' + voteData.deviceID);
	console.log('voteID : ' + voteData.voteID);
	console.log('voteID Length : ' + voteData.voteID.length);
	console.log('vote_num : ' + voteData.voteItemID);
	
	if(voteData.voteID.length === 0) {
		console.log('VoteItem Request');
		
		var voteItem = new VoteItem();
		
		VoteItem.find({itemStatus: 'Doing'}, function (err, docs) {
			if(err) {
				console.log('VoteItem.find() Error');
				return;
			}
			
			if(docs.length > 0) {
				console.log('Vaild Item is found');
				
				VoteData.find({deviceID: voteData.deviceID}, function (err, rets) {
					if(err) {
						console.log('VoteData.find() : deviceID Error');
						return;
					}
					
					if(rets.length > 0) {
						console.log(voteData.deviceID + ' is voted');

						voteItem.voteID = docs[0].voteID;
						voteItem.voteSubject = docs[0].voteSubject;
						
						console.log(voteItem);
						
						resp.charset = 'utf-8';
						resp.header("Access-Control-Allow-Origin", "*");
						resp.json(voteItem);
					} else {
						console.log(voteData.deviceID + ' can vote');
						resp.charset = 'utf-8';
						resp.header("Access-Control-Allow-Origin", "*");
						resp.json(docs[0]);
					}
				});
			} else {
				console.log('Voting Item Not Found');
				resp.send('Not Found');
			}
		});
	} else {
		console.log('Vote Data - Save');
		
		new VoteData(voteData).save(function (err, saveData) {
			if(err) {
				console.log('VoteData.save() Error');
				return;
			}
			
			console.log('new VoteData Saved');
		});
		resp.send(200);
	}
	/*
	VoteData.find({item_id: voteData.item_id}, function (err, retData) {
		if(err) {
			console.log('VoteData.find() Error');
			return;
		}
		
		if(retData.length > 0) {
			console.log('Item ID is Matched');
			retData.find({device_id: voteData.device_id}, function (err, rets){
				if(err) {
					console.log('retData.find() Error');
					return;
				}
				
				if(rets.length > 0) {
					console.log('Device ID is Matched');
				} else {
					console.log('Device ID is not Matched');
					
					new VoteData(voteData).save(function (err, saveData) {
						if(err) {
							console.log('VoteData.save() Error');
							return;
						}
						
						console.log('new VoteData Saved');
					});
				}
			});
			
		} else {
			console.log('Item ID is not Matched');
			
			new VoteData(voteData).save(function (err, ret) {
				if(err) {
					console.log('VoteData.save() Error');
					return;
				}
				
				console.log('new VoteData Saved');
			});
		}
	});
	*/
	
	//resp.send(200);
};

exports.getVotesData = function (req, resp) {

	var voteData = new VoteData();
	
	console.log('getVotesData()');

	VoteData.find({}, function (err, rets) {
		if(err) {
			console.log('VoteData.find() Error');
			resp.send(200);
			return;
		}
		
		if(rets.length > 0) {
			console.log('Found');
			//var resp_data = JSON.stringify(rets);
			resp.send(rets);
		} else {
			console.log('No Found');
			resp.send(200);
		}
	});
};

exports.getVotesItems = function (req, resp) {

	var voteItem = new VoteItem();
	
	console.log('getVotesItem()');

	VoteItem.find({}, function (err, rets) {
		if(err) {
			console.log('VoteItem.find() Error');
			resp.send(200);
			return;
		}
		
		if(rets.length > 0) {
			console.log('Found');
			console.log(rets);
			//var resp_data = JSON.stringify(rets);
			resp.send(rets);
		} else {
			console.log('No Found');
			resp.send(200);
		}
	});
};

exports.startEndVote = function (req, resp) {
	console.log('StartEndVote()');
	
	var itemStatus = '', itemId = '';
	
	console.log(req.body);

	itemStatus = req.body.itemStatus;
	itemId = req.body.itemId;
	
	console.log(itemStatus);
	console.log(itemId);
	
	VoteItem.where({_id: itemId}).update({itemStatus: itemStatus}, function(err, numAffected, raw) {
		if(err) {
			console.log('Update Error');
			return;
		}
		
		console.log('Affected Number : ' + numAffected);
		
		resp.send(200);
		
	});
};
