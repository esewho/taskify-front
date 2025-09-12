import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

type JwtPayload = {
	sub: string // userId
	email: string
	iat: number
	exp: number
}

export default function Navbar() {
	const navigate = useNavigate()
	const [email, setEmail] = useState<string | null>(null)

	useEffect(() => {
		const token = localStorage.getItem("accessToken")
		if (token) {
			try {
				const payload = jwtDecode<JwtPayload>(token)
				setEmail(payload.email)
			} catch {
				setEmail(null)
			}
		}
	}, [])

	const logout = () => {
		localStorage.removeItem("accessToken")
		navigate("/register", { replace: true })
	}

	return (
		<header className="sticky top-0 bg-white border-b shadow-sm">
			<div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
				<nav className="flex items-center gap-4 text-sm">
					<Link to="/app" className="hover:underline">
						Dashboard
					</Link>
					<Link to="/app/tasks" className="hover:underline">
						Tareas
					</Link>
					<Link to="/app/profile" className="hover:underline">
						Perfil
					</Link>
				</nav>
				<div className="flex items-center gap-3">
					{email ? (
						<>
							<span className="text-sm opacity-80">{email}</span>
							<button
								onClick={logout}
								className="rounded-xl border px-3 py-1.5 text-sm hover:shadow"
							>
								Cerrar sesión
							</button>
						</>
					) : (
						<Link to="/register" className="text-sm underline">
							Login
						</Link>
					)}
				</div>
			</div>
		</header>
	)
}
