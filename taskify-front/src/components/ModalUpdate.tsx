// UpdateTaskModal.tsx
import React from "react"
import type { Task } from "../types/task-type"

type UpdateTaskModalProps = {
	open: boolean
	task: Task | null
	onClose: () => void
	onSave: (
		task: Task,
		updates: {
			title: string
			description?: string | null
			completed: boolean
		}
	) => Promise<void> | void
	saving?: boolean
}

export default function ModalUpdate({
	open,
	task,
	onClose,
	onSave,
	saving,
}: UpdateTaskModalProps) {
	const [title, setTitle] = React.useState(task?.title ?? "")
	const [description, setDescription] = React.useState(task?.description ?? "")

	React.useEffect(() => {
		setTitle(task?.title ?? "")
		setDescription(task?.description ?? "")
	}, [task])

	if (!open || !task) return null

	const submit = async (e: React.FormEvent) => {
		e.preventDefault()
		await onSave(task, { title, description, completed: task.completed })
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* backdrop */}
			<div className="absolute inset-0 bg-black/40" onClick={onClose} />
			{/* dialog */}
			<div
				role="dialog"
				aria-modal="true"
				className="relative bg-white rounded-2xl p-5 shadow-xl w-full max-w-md"
			>
				<h3 className="text-lg font-semibold mb-3">Editar tarea</h3>
				<form onSubmit={submit} className="space-y-3">
					<label className="block text-sm">
						Título
						<input
							className="mt-1 w-full rounded-xl border px-3 py-2"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
						/>
					</label>
					<label className="block text-sm">
						Descripción
						<textarea
							className="mt-1 w-full rounded-xl border px-3 py-2"
							value={description ?? ""}
							onChange={(e) => setDescription(e.target.value)}
							rows={4}
						/>
					</label>
					<div className="flex justify-end gap-2 pt-2">
						<button
							type="button"
							className="rounded-xl border px-3 py-1.5"
							onClick={onClose}
						>
							Cancelar
						</button>
						<button
							type="submit"
							disabled={saving}
							className="rounded-xl border px-3 py-1.5 hover:shadow"
						>
							{saving ? "Guardando..." : "Guardar"}
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
