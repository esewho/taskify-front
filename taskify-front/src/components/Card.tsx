import React from "react"

import type { Task } from "../types/task-type"
type Props = {
	task: Task
	onOpen: (task: Task) => void
}

export default function TaskCard({ task, onOpen }: Props) {
	return (
		<button
			onClick={() => onOpen(task)}
			className={[
				"group text-left w-full rounded-xl p-4 shadow",
				"bg-yellow-100 hover:bg-yellow-200 transition",
				"border border-yellow-300",
				"relative overflow-hidden",
			].join(" ")}
			aria-label={`Abrir detalle de ${task.title}`}
		>
			<div className="absolute top-0 left-0 w-24 h-24 rounded-br-full bg-yellow-200/60" />
			<div className="relative">
				<div className="flex items-center gap-2 mb-1">
					<span
						className={`inline-block h-2 w-2 rounded-full ${
							task.completed ? "bg-green-500" : "bg-gray-400"
						}`}
					/>
					<h3 className="font-semibold line-clamp-1">{task.title}</h3>
				</div>
				{task.description && (
					<p className="text-sm text-gray-700 line-clamp-3">
						{task.description}
					</p>
				)}
				<p className="mt-2 text-[11px] text-gray-500">
					#{task.id} · {new Date(task.createdAt).toLocaleDateString()}
				</p>
			</div>
		</button>
	)
}
