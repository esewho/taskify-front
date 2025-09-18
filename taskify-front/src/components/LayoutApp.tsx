// components/AppLayout.tsx
import { Outlet } from "react-router-dom"
import Navbar from "./NavBar"

export default function AppLayout() {
	return (
		<div className="min-h-screen min-w-screen bg-gray-50">
			<Navbar />

			<main className="flex flex-col h-full px-10 py-6 justify-center items-center">
				{/* Grid responsiva para el contenido de la página */}
				<div className="  gap-6 items-center">
					<Outlet />
				</div>
			</main>
		</div>
	)
}
