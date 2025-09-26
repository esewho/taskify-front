import React, { useState, type FormEvent } from "react"
import { createTask } from "../lib/lib"
import toast from "react-hot-toast"
import type { Task } from "../types/task-type"

interface Props {
	onCreateTask: (task: Task) => Promise<void>
}

export default function TaskForm(props: Props) {
	const { onCreateTask } = props
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [dueDate, setDueDate] = useState("")
	const [completed, setCompleted] = useState(false)

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()
		try {
			const task = await createTask({
				title,
				description,
				completed,
				dueDate: dueDate || null,
			})
			setTitle("")
			setDescription("")
			setDueDate("")
			setCompleted(false)
			toast.success("Task creada exitosamente!")
			onCreateTask(task)
		} catch (error) {
			console.error(error)
			toast.error("Error al crear la tarea")
		}
	}
	const today = new Date().toISOString().split("T")[0]

	return (
		<section className="flex flex-col  bg-white rounded-lg shadow-md  px-4 py-4 border w-80 h-full ">
			<div className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4">
				<h2 className="font-bold">Taskify</h2>
				<p>¡Crea tu nueva tarea!</p>
			</div>
			<div className="justify-items-baseline">
				<form onSubmit={handleSubmit}>
					<div className="mb-4 pl-4 pr-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="task"
						>
							Tarea
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="title3"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							type="text"
							placeholder="Escribe tu tarea aquí"
						/>
					</div>
					<div className="mb-4 pl-4 pr-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="description"
						>
							Descripción
						</label>
						<textarea
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Escribe una descripción"
						></textarea>
					</div>

					<div className="mb-4 pl-4 pr-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="dueDate"
						>
							Fecha de vencimiento
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="dueDate"
							min={today}
							type="date"
							value={dueDate}
							onChange={(e) => setDueDate(e.target.value)}
						/>
					</div>
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 pl-4 ml-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Agregar Tarea
					</button>
				</form>
			</div>
		</section>
	)
}
