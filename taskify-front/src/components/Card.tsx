import { useState } from "react"
import type { Task } from "../types/task-type"

type Props = {
	task: Task
	onDelete?: (task: Task) => Promise<void>
	onOpen: (task: Task) => void
	handlerChange?: (task: Task) => void // 👈 opcional callback
	onUpdateTask?: (task: Task, updates: Partial<Task>) => Promise<void>
}

export default function TaskCard({
	task,
	onOpen,
	handlerChange,
	onDelete,
}: Props) {
	const [completed, setCompleted] = useState<boolean>(task.completed)

	const toggleCompleted = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation() // 👈 evita que se dispare el onOpen al clickar el checkbox
		const newValue = e.target.checked
		setCompleted(newValue)
		handlerChange?.(task)
	}

	return (
		<>
			<div
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
						<button
							onClick={() => onDelete?.(task)}
							className="px-1 relative hover:bg-gray-200 rounded-full transition"
						>
							<svg width="16" height="16" viewBox="0 0 24 24">
								<path
									fill="#666666"
									d="m9.4 16.5l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L16 9.9l-1.4-1.4l-2.6 2.6l-2.6-2.6L8 9.9l2.6 2.6L8 15.1zM7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21z"
								/>
							</svg>
						</button>

						{!completed && (
							<button
								onClick={() => onOpen(task)}
								className="px-1 relative hover:bg-gray-200 rounded-full transition"
							>
								<svg width="16" height="16" viewBox="0 0 24 24">
									<path
										fill="#555555"
										d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"
									/>
								</svg>
							</button>
						)}

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
					<div className="mt-2 flex flex-col  text-[11px] text-gray-500">
						<span>Creada: {new Date(task.createdAt).toLocaleDateString()}</span>
						{task.dueDate && (
							<span
								className={
									new Date(task.dueDate) < new Date()
										? "text-red-500 font-semibold" // 👈 vencida
										: ""
								}
							>
								Vence: {new Date(task.dueDate).toLocaleDateString()}
								<p className="absolute bottom-0 right-100 top-11 text-xs text-gray-400 opacity-75">
									Quedan{" "}
									{Math.ceil(
										(new Date(task.dueDate).getTime() - new Date().getTime()) /
											(1000 * 60 * 60 * 24)
									)}{" "}
									días
								</p>
							</span>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
