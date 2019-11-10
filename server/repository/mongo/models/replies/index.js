const Schema = require('mongoose').Schema;

const ReplySchema = new Schema({
	
	data: {
		type: Schema.Types.Mixed,
		required: false
	},
	tweetId: {
		type: Schema.Types.ObjectId,
		ref: 'tweets'
	},
	userId: {
		type: Number,
		required: true
	}
}, {
	timestamps: true
});

module.exports = ReplySchema;