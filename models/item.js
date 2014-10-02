/**
 * item.js in models
 */

var MONGOOSE = require('mongoose');
var	Schema = MONGOOSE.Schema;

var voteItemContentSchema = new Schema({
	id: Number,
	title: String
},
{ versionKey: false}
);

var voteItemSchema = new Schema({
	voteSubject: String,
	voteItems: [voteItemContentSchema],
	itemStatus: String,
	voteData: Date
},
{ versionKey: false}
);

var VoteItem =  MONGOOSE.model('VoteItem', voteItemSchema);
module.exports = VoteItem;