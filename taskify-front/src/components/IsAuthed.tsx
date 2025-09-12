import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export default function IsAuthed() {
	const token = localStorage.getItem("accessToken")
	const navigate = useNavigate()

	useEffect(() => {
		if (!token) {
			navigate("/register")
			return
		}

		navigate("/home")
	}, [token])
	return <Outlet />
}
