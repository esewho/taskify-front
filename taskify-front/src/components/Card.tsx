import { useState } from "react"
import type { Task } from "../types/task-type"

type Props = {
	task: Task
	onOpen: (task: Task) => void
	handlerChange?: (task: Task) => void // 👈 opcional callback
}

export default function TaskCard({ task, onOpen, handlerChange }: Props) {
	const [completed, setCompleted] = useState<boolean>(task.completed)

	const toggleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation() // 👈 evita que se dispare el onOpen al clickar el checkbox
		const newValue = e.target.checked
		setCompleted(newValue)
		handlerChange?.(task)
	}

	return (
		<button
			onClick={() => onOpen(task)}
			className={[
				"group text-left w-full rounded-xl p-4 shadow h-32",
				"bg-yellow-100 hover:bg-yellow-200 transition",
				"border border-yellow-300",
				"relative overflow-hidden",
			].join(" ")}
			aria-label={`Abrir detalle de ${task.title}`}
		>
			<div className="absolute top-0 left-0 w-24 h-24 rounded-br-full bg-yellow-200/60" />
			<div className="relative">
				<div className="flex items-center justify-between mb-1">
					<div className="flex items-center gap-2">
						<span
							className={`inline-block h-2 w-2 rounded-full ${
								completed ? "bg-green-500" : "bg-gray-400"
							}`}
						/>
						<h3
							className={`font-semibold line-clamp-1 ${
								completed ? "line-through text-gray-500" : ""
							}`}
						>
							{task.title}
						</h3>
					</div>

					{/* checkbox para marcar completada */}
					<input
						type="checkbox"
						checked={completed}
						onChange={toggleCompleted}
						className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
					/>
				</div>

				{task.description && (
					<p
						className={`text-sm line-clamp-3 ${
							completed ? "text-gray-400 italic" : "text-gray-700"
						}`}
					>
						{task.description}
					</p>
				)}
				<p className="mt-2 text-[11px] text-gray-500">
					· {new Date(task.createdAt).toLocaleDateString()}
				</p>
			</div>
		</button>
	)
}
