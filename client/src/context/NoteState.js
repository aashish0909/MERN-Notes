import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const state = {
        name: "Aashish",
        age : 18
    }
    return (
        <NoteContext.Provider value = {state}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState