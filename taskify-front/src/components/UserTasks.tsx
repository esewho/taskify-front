import React, { useEffect, useState } from "react"
import { getTasks } from "../lib/lib"
import type { Task } from "../types/task-type"
import TaskCard from "./Card"

export default function UserTasks() {
	const [tasks, setTasks] = useState<Task[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function fetchTasks() {
			try {
				const data = await getTasks()
				setTasks(data)
			} catch (e) {
				setError(e instanceof Error ? e.message : "Unknown error")
			} finally {
				setLoading(false)
			}
		}
		fetchTasks()
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>{error}</div>
	}
	return (
		<div className="flex-1 flex flex-col w-3/3 h-screen">
			{/* Sección derecha */}
			<section className="flex-1 bg-white rounded-lg shadow m-4 p-4 max-w-md">
				<div className="border rounded-lg p-2 max-w-md">
					<h2 className="font-bold">Tus tareas</h2>
					<p>😍</p>
				</div>
				{loading && <p className="text-gray-600">Cargando tareas...</p>}
				{error && <p className="text-gray-600">{error}</p>}

				{!loading && !error && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto mt-4">
						{tasks.length === 0 ? (
							<p className="text-gray-600">No hay tareas todavía</p>
						) : (
							tasks.map((t) => (
								<TaskCard
									key={t.id}
									task={t}
									onOpen={(task) => console.log("abrir modal de ", task)}
								/>
							))
						)}
					</div>
				)}
			</section>
		</div>
	)
}
