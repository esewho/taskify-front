import { Route, Routes } from "react-router-dom"

import RegisterForm from "../components/RegisterForm"

import TasksApp from "../components/tasksApp"

import IsAuthed from "../components/IsAuthed"
import Navbar from "../components/NavBar"

export default function IndexRoutes() {
	return (
		<Routes>
			<Route element={<IsAuthed />} path="/">
				<Route element={<RegisterForm />} path="/register" />
				<Route element={<TasksApp />} path="/home">
					<Route element={<Navbar />} />
				</Route>
			</Route>
		</Routes>
	)
}
