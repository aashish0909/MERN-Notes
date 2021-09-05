import React, { useContext} from "react"
import NoteContext from "../context/NoteContext"

const About = () => {
	const a = useContext(NoteContext)
	return (
		<div>
            <h1>This is about {a.name}</h1>
            <p>He is {a.age} years old</p>
		</div>
	)
}

export default About