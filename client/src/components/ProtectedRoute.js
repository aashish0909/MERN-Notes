import React from "react"
import { Redirect, Route, useHistory } from "react-router"

const ProtectedRoute = ({ component: Component, ...restOfProps }) => {
    let history = useHistory()
    const isAuthenticated = localStorage.getItem("isAuthenticated")
	return (
		<Route
			{...restOfProps}
			render={(props) => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)}
		/>
	)
}

export default ProtectedRoute
