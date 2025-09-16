// components/AppLayout.tsx
import { Outlet } from "react-router-dom"
import Navbar from "./NavBar"

export default function AppLayout() {
	return (
		<div className="min-h-screen bg-gray-50">
			<Navbar />

			<main className="container mx-auto px-4 py-6">
				{/* Grid responsiva para el contenido de la página */}
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
					<Outlet />
				</div>
			</main>
		</div>
	)
}
