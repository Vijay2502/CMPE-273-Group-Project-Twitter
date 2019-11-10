const Schema = require('mongoose').Schema;

const TweetSchema = new Schema({
	data: {
		type: Schema.Types.Mixed,
		required: true
	},
	userId: {
		type: Number,
		required: true
	}
}, {
	timestamps: true
});

module.exports = TweetSchema;
