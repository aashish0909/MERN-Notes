import React, { useContext, useEffect, useRef, useState } from "react"
import NoteContext from "../context/NoteContext"
import AddNote from "./AddNote"
import NoteItem from "./NoteItem"

const Notes = (props) => {
	const context = useContext(NoteContext)
	const { notes, getNotes, editNote } = context

	useEffect(() => {
		getNotes()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const ref = useRef(null)
	const refClose = useRef(null)

	const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })

	const updateNote = (currentNote) => {
		ref.current.click()
		setNote({
			id: currentNote._id,
			etitle: currentNote.title,
			edescription: currentNote.description,
			etag: currentNote.tag,
		})
	}
	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value })
	}
	const handleClick = (e) => {
		e.preventDefault()
		editNote(note.id, note.etitle, note.edescription, note.etag)
		refClose.current.click()
		props.showAlert("Your note has been successfully updated","info")
	}

	return (
		<>
			<AddNote showAlert={props.showAlert} />
			<button
				type="button"
				className="btn btn-primary d-none"
				data-bs-toggle="modal"
				data-bs-target="#exampleModal"
				ref={ref}
			>
				Launch demo modal
			</button>
			<div
				className="modal fade"
				id="exampleModal"
				tabIndex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Edit Note
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form>
								<div className="mb-3">
									<label htmlFor="title" className="form-label">
										Title
									</label>
									<input
										type="text"
										className="form-control"
										id="title"
										name="etitle"
										value={note.etitle}
										aria-describedby="emailHelp"
										onChange={onChange}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="description" className="form-label">
										Description
									</label>
									<input
										type="text"
										className="form-control"
										id="description"
										value={note.edescription}
										name="edescription"
										onChange={onChange}
									/>
								</div>
								<div className="mb-3">
									<label htmlFor="tag" className="form-label">
										Tag
									</label>
									<input
										type="text"
										className="form-control"
										id="tag"
										value={note.etag}
										name="etag"
										onChange={onChange}
									/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								ref={refClose}
								className="btn btn-danger"
								data-bs-dismiss="modal"
							>
								Close
							</button>
							<button type="button" onClick={handleClick} className="btn btn-success">
								Update Note
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="row my-3">
				<h2>Your Notes</h2>
				{notes.map((note) => {
					return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
				})}
			</div>
		</>
	)
}

export default Notes
