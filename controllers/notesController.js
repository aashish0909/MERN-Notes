const Note = require("../models/Notes")

module.exports.fetchallnotes = async (req, res) => {
	const notes = await Note.find({ user: req.user.id })
	res.json(notes)
}

module.exports.addnote = async (req, res) => {
	try {
		const { title, description, tag } = req.body
		const note = await new Note({
			title,
			description,
			tag,
			user: req.user.id,
		})
		const savedNote = await note.save()
		res.json(savedNote)
	} catch (error) {
		console.error(error.message)
		res.status(500).send("Internal Server Error")
	}
}
