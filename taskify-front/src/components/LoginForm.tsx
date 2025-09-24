import React from "react"
import { useNavigate } from "react-router-dom"

import { toast } from "react-hot-toast"
import { login } from "../lib/lib"

export default function LoginForm() {
	const [email, setEmail] = React.useState("")
	const [password, setPassword] = React.useState("")
	const [loading, setLoading] = React.useState(false)
	const navigate = useNavigate()

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// 1) Validación previa
		if (!email || !password) {
			toast.error("Email y contraseña son obligatorios")
			return
		}
		if (password.length < 8) {
			toast.error("La contraseña debe tener al menos 8 caracteres")
			return
		}

		setLoading(true)
		try {
			// 2) Llamada a API
			const { accessToken } = await login(email, password)
			if (!accessToken) {
				toast.error("Respuesta inválida del servidor")
				return
			}

			localStorage.setItem("accessToken", accessToken)

			toast.success("Inicio de sesión correcto")
			// 3) Navegar SOLO tras éxito real
			navigate("/home", { replace: true })
		} catch (_err) {
			// No muestres detalles técnicos al usuario final
			toast.error("Credenciales inválidas o error del servidor")
		} finally {
			setLoading(false)
			// Borra el password en memoria
			setPassword("")
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col justify-center items-center max-w-md mx-auto rounded-3xl border p-6 shadow-sm space-y-4">
				<h2 className="text-xl font-semibold">Login</h2>

				<form onSubmit={onSubmit} className="space-y-3" autoComplete="on">
					<label className="block text-sm font-medium">
						Email
						<input
							type="email"
							inputMode="email"
							autoComplete="email"
							className="mt-1 w-full rounded-2xl border px-3 py-2"
							value={email}
							onChange={(e) => setEmail(e.target.value.trim())}
							required
						/>
					</label>

					<label className="block text-sm font-medium">
						Contraseña
						<input
							type="password"
							autoComplete="current-password"
							className="mt-1 w-full rounded-2xl border px-3 py-2"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							minLength={8}
						/>
					</label>

					<button
						type="submit"
						disabled={loading}
						className="rounded-2xl px-4 py-2 border shadow-sm"
					>
						{loading ? "Cargando..." : "Iniciar sesión"}
					</button>
				</form>
			</div>
		</div>
	)
}
