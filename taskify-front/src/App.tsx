import { useEffect, useMemo, useState } from "react"
import { createTask, deleteTask, getTasks, updateTask } from "./api"

export default function App() {
	// Para la demo, mete aquí tu email de usuario
	const [email, setEmail] = useState<string>("you@example.com")

	const [tasks, setTasks] = useState<Task[]>([])
	const [title, setTitle] = useState("")
	const [desc, setDesc] = useState("")
	const [loading, setLoading] = useState(false)
	const [submitting, setSubmitting] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const canSubmit = useMemo(
		() => title.trim().length > 0 && !!email.trim(),
		[title, email]
	)

	async function load() {
		try {
			setLoading(true)
			const data = await getTasks(email.trim() || undefined)
			setTasks(data)
		} catch (e: any) {
			setError(e.message ?? "Error loading tasks")
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		load() /* reload when email changes */
	}, [email])

	async function onCreate(e: React.FormEvent) {
		e.preventDefault()
		if (!canSubmit) return
		try {
			setSubmitting(true)
			await createTask({
				title: title.trim(),
				description: desc.trim() || undefined,
				email,
				completed: false,
			})
			setTitle("")
			setDesc("")
			await load()
		} catch (e: any) {
			setError(e.message ?? "Error creating task")
		} finally {
			setSubmitting(false)
		}
	}

	async function toggle(task: Task) {
		try {
			await updateTask(task.id, { completed: !task.completed })
			await load()
		} catch (e: any) {
			setError(e.message ?? "Error updating task")
		}
	}

	async function remove(task: Task) {
		try {
			await deleteTask(task.id)
			await load()
		} catch (e: any) {
			setError(e.message ?? "Error deleting task")
		}
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-2xl mx-auto p-6">
				<h1 className="text-2xl font-bold mb-4">Taskify — tus tareas</h1>

				{/* Selector de email (simple) */}
				<div className="bg-white rounded-xl shadow p-4 mb-4">
					<label className="block text-sm text-gray-600 mb-1">
						Tu email (usuario)
					</label>
					<input
						className="w-full border rounded-lg p-2"
						placeholder="you@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				{/* Formulario de creación */}
				<form
					onSubmit={onCreate}
					className="bg-white rounded-xl shadow p-4 mb-6 space-y-3"
				>
					<input
						className="w-full border rounded-lg p-2"
						placeholder="Título de la tarea"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						className="w-full border rounded-lg p-2"
						placeholder="Descripción (opcional)"
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
					/>
					<button
						disabled={!canSubmit || submitting}
						className="px-4 py-2 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed bg-black"
					>
						{submitting ? "Creando…" : "Crear tarea"}
					</button>
					{error && <p className="text-sm text-red-600">{error}</p>}
				</form>

				{/* Lista */}
				<div className="space-y-2">
					{loading ? (
						<div className="text-gray-600">Cargando…</div>
					) : tasks.length === 0 ? (
						<div className="text-gray-500">No hay tareas.</div>
					) : (
						tasks.map((t) => (
							<div
								key={t.id}
								className="bg-white rounded-xl shadow p-3 flex items-start justify-between"
							>
								<div className="pr-3">
									<div className="flex items-center gap-2">
										<input
											type="checkbox"
											checked={t.completed}
											onChange={() => toggle(t)}
											className="h-4 w-4"
										/>
										<p
											className={`font-medium ${
												t.completed ? "line-through text-gray-400" : ""
											}`}
										>
											{t.title}
										</p>
									</div>
									{t.description && (
										<p className="text-sm text-gray-600 mt-1">
											{t.description}
										</p>
									)}
									<p className="text-[11px] text-gray-400 mt-1">
										#{t.id} · {new Date(t.createdAt).toLocaleString()}
									</p>
								</div>
								<div className="flex gap-2">
									<button
										onClick={() => toggle(t)}
										className="px-3 py-1 border rounded-lg"
										title={
											t.completed
												? "Marcar como pendiente"
												: "Marcar como completada"
										}
									>
										{t.completed ? "Desmarcar" : "Completar"}
									</button>
									<button
										onClick={() => remove(t)}
										className="px-3 py-1 border rounded-lg"
										title="Eliminar"
									>
										Eliminar
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	)
}
