const Schema = require('mongoose').Schema;

const conversationSchema = new Schema({
    channel: {
		type: String,
		unique: true,
		required: true,

	},
	data: {
		type: Schema.Types.Mixed,
		required: true
	},
	users: [
		Number
	]
}, {
	timestamps: true
});

module.exports = conversationSchema;

