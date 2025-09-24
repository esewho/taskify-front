// routes/indexRoutes.tsx
import { Route, Routes, Navigate } from "react-router-dom"
import IsAuthed from "../components/IsAuthed"
import LayoutApp from "../components/LayoutApp"
import RegisterForm from "../components/RegisterForm"

import Dashboard from "../components/Dashboard"
import LoginForm from "../components/LoginForm"
export default function IndexRoutes() {
	const authed = Boolean(localStorage.getItem("accessToken"))

	return (
		<Routes>
			{/* Público */}
			<Route path="/register" element={<RegisterForm />} />
			{/* <Route path="/login" element={<LoginForm />} /> */}

			{/* Protegido */}
			<Route element={<IsAuthed />}>
				<Route element={<LayoutApp />}>
					<Route path="/home" element={<Dashboard />} />
					{/* aquí puedes añadir más rutas hijas protegidas */}
				</Route>
			</Route>

			{/* Redirect raíz */}
			<Route
				path="/"
				element={<Navigate to={authed ? "/home" : "/register"} replace />}
			/>
			<Route path="login" element={<LoginForm />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	)
}
