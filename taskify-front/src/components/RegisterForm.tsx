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
		setLoading(true)
		try {
			await register(email, password)
			toast.success("Usuario registrado correctamente")
			setEmail("")
			setPassword("")
		} catch (error: unknown) {
			console.log(error)
			toast.error("Error al registrar")
		} finally {
			setLoading(false)
		}
	}
	return (
		<div className="rounded-3xl border p-6 shadow-sm space-y-4">
			<h2 className="text-xl font-semibold">Registro</h2>
			<form onSubmit={onSubmit} className="space-y-3">
				<label className="block text-sm font-medium">
					Email
					<input
						type="email"
						className="mt-1 w-full rounded-2xl border px-3 py-2"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
						required
						minLength={8}
					/>
				</label>
				<button
					type="submit"
					disabled={loading}
					className="rounded-2xl px-4 py-2 border shadow-sm"
					onClick={() => navigate("/home")}
				>
					{loading ? "Cargando..." : "Crear cuenta"}
				</button>
			</form>
		</div>
	)
}
