const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NotesSchema = new Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		requried: true,
	},
	tag: {
		type: String,
		default: "General",
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

module.exports = Notes = mongoose.model("notes", NotesSchema)
