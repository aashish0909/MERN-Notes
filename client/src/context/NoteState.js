import NoteContext from "./NoteContext"
import { useState } from "react"
import axios from "axios"

const NoteState = (props) => {
	const host = "http://localhost:5000"

	const notesInital = []

	const [notes, setNotes] = useState(notesInital)

	const getNotes = async () => {
		const json = await axios.get(`${host}/api/notes/fetchallnotes`, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		})
		setNotes(Array.from(json.data))
	}

	const addNote = async (title, description, tag) => {
		const response = await axios.post(
			`${host}/api/notes/addnote`,
			{
				title: title,
				description: description,
				tag: tag,
			},
			{
				headers: {
					"auth-token": localStorage.getItem("token"),
				},
			}
		)

		setNotes([...notes, response.data])
	}

	const deleteNote = async (id) => {
		await axios.delete(`${host}/api/notes/deletenote/${id}`, {
			headers: {
				"auth-token": localStorage.getItem("token"),
			},
		})
		const newNotes = notes.filter((note) => {
			return note._id !== id
		})
		setNotes(newNotes)
	}

	const editNote = async (id, title, description, tag) => {
		await axios.put(
			`${host}/api/notes/updatenote/${id}`,
			{ title, description, tag },
			{
				headers: {
					"auth-token": localStorage.getItem("token"),
				},
			}
		)
		let newNotes = await JSON.parse(JSON.stringify(notes))
		for (let i = 0; i < newNotes.length; i++) {
			if (newNotes[i]._id === id) {
				newNotes[i].title = title
				newNotes[i].description = description
				newNotes[i].tag = tag
				break
			}
		}
		setNotes(newNotes)
	}

	return (
		<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
			{props.children}
		</NoteContext.Provider>
	)
}

export default NoteState
