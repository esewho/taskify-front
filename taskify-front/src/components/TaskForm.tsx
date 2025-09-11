import React, { useState, type FormEvent } from "react"
import { createTask } from "../lib/lib"
import toast from "react-hot-toast"

export default function TaskForm() {
	const [title, setTitle] = useState("")
	const [description, setDescription] = useState("")
	const [dueDate, setDueDate] = useState("")
	const [completed, setCompleted] = useState(false)

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()
		try {
			await createTask({
				title,
				description,
				completed,
			})
			setTitle("")
			setDescription("")
			setDueDate("")
			setCompleted(false)
			toast.success("Task creada exitosamente!")
		} catch (error) {
			console.error(error)
			toast.error("Error al crear la tarea")
		}
	}

	return (
		<div className="flex flex-direction-column w-full h-full">
			<section className="flex-1 bg-white rounded-lg shadow p-4 max-w-md m-4">
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
		</div>
	)
}
