const Schema = require('mongoose').Schema;
const replySchema = require('../replies');
const TweetSchema = new Schema({
	data: {
		type: Schema.Types.Mixed,
		required: true
	},
	ownerId: {
		type: Number,
		required: true,
		unique: true
	},
	retweet: {
		isRetweet: Boolean,
		tweetId: {
			type: Schema.Types.ObjectId,
			ref: 'tweets'
		}
	},
	likes: {
		type: Schema.Types.Mixed,
		required: true
	},
	views: {
		type: Schema.Types.Mixed,
		required: true
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
