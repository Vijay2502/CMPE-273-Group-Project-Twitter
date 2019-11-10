const Schema = require('mongoose').Schema;

const FeedSchema = new Schema({
	data: {
		type: Schema.Types.Mixed,
		required: false
	},
	userId: {
		type: Number,
		required: true
	}
}, {
	timestamps: true
});

module.exports = FeedSchema;

