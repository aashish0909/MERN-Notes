import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import About from "./components/About"
import NoteState from "./context/NoteState"
import Alert from "./components/Alert"
import Login from "./components/Login"
import Signup from "./components/Signup"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
	const [alert, setAlert] = useState(null)

	const showAlert = (message, type) => {
		setAlert({
			msg: message,
			type: type,
		})
		setTimeout(() => {
			setAlert(null)
		}, 2500)
	}

	return (
		<>
			<NoteState>
				<Router>
					<Navbar />
					<Alert alert={alert} />
					<div className="container">
						<Switch>
							<ProtectedRoute exact path="/">
								<Home showAlert={showAlert}/>
								</ProtectedRoute>
							<ProtectedRoute exact path="/about" component={About} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/signup" component={Signup} />
						</Switch>
					</div>
				</Router>
			</NoteState>
		</>
	)
}

export default App
