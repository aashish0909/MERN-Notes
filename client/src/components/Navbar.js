import React from "react"
import { Link, useLocation, useHistory } from "react-router-dom"

const Navbar = () => {
	let location = useLocation()
	let history = useHistory()
	const isAuthenticated = localStorage.getItem("isAuthenticated")

	const logout = () => {
		localStorage.clear()
		history.push("/login")
	}
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						Notes
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className={`navbar-nav me-auto mb-2 mb-lg-0`}>
							<li className="nav-item">
								<Link
									className={`nav-link ${location.pathname === "/" ? "active" : ""} ${
										location.pathname === ("/login" || "/signup") ? "d-none" : ""
									}`}
									aria-current="page"
									to="/"
								>
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className={`nav-link ${location.pathname === "/about" ? "active" : ""} ${
										location.pathname === ("/login" || "/signup") ? "d-none" : ""
									}`}
									to="/about"
								>
									About
								</Link>
							</li>
						</ul>
						<form className="d-flex">
							{!isAuthenticated && (
								<Link className="btn btn-primary mx-2" to="/login" role="button">
									Login
								</Link>
							)}
							{!isAuthenticated && (
								<Link className="btn btn-primary" to="/signup" role="button">
									Signup
								</Link>
							)}
							{isAuthenticated && (
								<button type = "button" className="btn btn-danger mx-2" onClick={logout}>
									Logout
								</button>
							)}
						</form>
					</div>
				</div>
			</nav>
		</div>
	)
}

export default Navbar
