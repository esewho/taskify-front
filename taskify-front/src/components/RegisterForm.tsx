import React, { useState } from "react"
import { register } from "../lib/lib"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function RegisterForm() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

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
			// 👇 esta función ya debería guardar el accessToken en localStorage
			const { accessToken } = await register(email, password)

			if (!accessToken) {
				toast.error("El servidor no devolvió token")
				return
			}

			toast.success("Usuario registrado correctamente")
			setEmail("")
			setPassword("")

			// 👇 redirige al login (o a /home si quieres entrar directo)
			navigate("/home", { replace: true })
		} catch (error: unknown) {
			console.error(error)
			toast.error("Error al registrar")
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col justify-center items-center max-w-md mx-auto rounded-3xl border p-6 shadow-sm space-y-4">
				<h2 className="text-xl font-semibold">Registro</h2>
				<form onSubmit={onSubmit} className="space-y-3">
					<label className="block text-sm font-medium">
						Email
						<input
							type="email"
							className="mt-1 w-full rounded-2xl border px-3 py-2"
							value={email}
							onChange={(e) => setEmail(e.target.value.trim())}
							autoComplete="email"
							required
						/>
					</label>
					<label className="block text-sm font-medium">
						Contraseña
						<input
							type="password"
							className="mt-1 w-full rounded-2xl border px-3 py-2"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							autoComplete="new-password"
							required
							minLength={8}
						/>
					</label>
					<button
						type="submit"
						disabled={loading}
						className="rounded-2xl px-4 py-2 border shadow-sm"
					>
						{loading ? "Cargando..." : "Crear cuenta"}
					</button>

					<button
						type="button"
						className="text-sm text-blue-500 px-4 hover:underline"
						onClick={() => navigate("/login")}
					>
						¿Ya tienes una cuenta? Inicia sesión
					</button>
				</form>
			</div>
		</div>
	)
}
