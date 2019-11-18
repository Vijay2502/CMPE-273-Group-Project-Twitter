const Schema = require('mongoose').Schema;
const replySchema = require('../replies');

const TweetSchema = new Schema({
	tweetId: {
		type: String,
		required: true
	},
	data: {
		type: Schema.Types.Mixed,
		required: true
	},
	ownerId: {
		type: Number,
		required: true
	},
	retweet: {
		isRetweet: Boolean,
		tweetId: {
			type: String
		}
	},
	likes: {
		count: Number,
		userId: [String]
	},
	views: {
		count: Number,
		userId: [String]
	},
	replies: [
		replySchema
	],
	hashTags: [
		String
	]

}, {
	timestamps: true
});

module.exports = TweetSchema;
