import axios from "axios"
import React, { useState } from "react"
import { useHistory } from "react-router"

const Login = () => {
	let history = useHistory()

	const [credentials, setcredentials] = useState({ email: "", password: "" })

	const onChange = (e) => {
		setcredentials({ ...credentials, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const res = await axios.post("http://localhost:5000/api/auth/login", {
			email: credentials.email,
			password: credentials.password,
		})
		setcredentials({ email: "", password: "" })
		if (res.data.success) {
			localStorage.setItem("token", res.data.token)
			history.push("/")
			console.log(
				await axios.get("http://localhost:5000/api/auth/getuser", {
					headers: {
						"auth-token": localStorage.getItem("token"),
					},
				})
			)
		} else {
		}
	}
	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">
						Email address
					</label>
					<input
						type="email"
						value={credentials.email}
						className="form-control"
						id="email"
						name="email"
						onChange={onChange}
						aria-describedby="emailHelp"
					/>
					<div id="emailHelp" className="form-text">
						We'll never share your email with anyone else.
					</div>
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">
						Password
					</label>
					<input
						type="password"
						onChange={onChange}
						value={credentials.password}
						className="form-control"
						id="password"
						name="password"
					/>
				</div>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	)
}

export default Login
