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

module.exports.updatenote = async (req, res) => {
	const { title, description, tag } = req.body
	try {
		let newNote = {}
		if (title) newNote.title = title
		if (description) newNote.description = description
		if (tag) newNote.tag = tag

		let note = await Note.findById(req.params.id)

		if (!note) return res.status(404).send("Not Found")

		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed")
		}

		note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
		res.json(note)
	} catch (err) {
		console.error(error.message)
		res.status(500).send("Internal Server Error")
	}
}

module.exports.deletenote = async (req, res) => {
	try {
		let note = await Note.findById(req.params.id)

		if (!note) return res.status(404).send("Not Found")

		if (note.user.toString() !== req.user.id) {
			return res.status(401).send("Not Allowed")
		}

		await Note.findByIdAndDelete(req.params.id)
		res.json({ Success: "Note has been deleted", note: note })
	} catch (err) {
		console.error(error.message)
		res.status(500).send("Internal Server Error")
	}
}
