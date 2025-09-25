// pages/Dashboard.tsx
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import TaskForm from "../components/TaskForm"
import UserTasks from "../components/UserTasks"
import { deleteTask, getTasks, updateTask } from "../lib/lib"
import type { Task } from "../types/task-type"
import UserTasksCompleted from "./UserTaskCompleted"
import ModalUpdate from "./ModalUpdate"

export default function Dashboard() {
	const [tasks, setTasks] = useState<Task[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [tasksCompleted, setTasksCompleted] = useState<Task[]>([])
	const [onOpen, setOnOpen] = useState<boolean>(false)
	const [editTask, setEditTask] = useState<Task | null>(null)

	useEffect(() => {
		async function fetchTasks() {
			try {
				const data = await getTasks()
				const completedTasks = data.filter((t) => t.completed)
				const unCompletedtasks = data.filter((t) => !t.completed)
				setTasks(unCompletedtasks)
				setTasksCompleted(completedTasks)
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

	async function onUpdateTask(task: Task, updates: Partial<Task>) {
		try {
			console.log(task, "------------------------")
			await updateTask(task.id, updates)
			setTasks((prev) =>
				prev.map((t) => (t.id === task.id ? { ...t, ...updates } : t))
			)

			toast.success("Tarea actualizada")
		} catch (error) {
			toast.error("Error al actualizar la tarea")
		} finally {
			setOnOpen(false)
		}
	}

	async function onDelete(task: Task): Promise<void> {
		try {
			await deleteTask(task.id).then(() => {
				setTasks((prev) => prev.filter((t) => t.id !== task.id))
				toast.success("Tarea eliminada")
			})
		} catch (error) {
			toast.error(`${error}`)
		}
	}

	async function toggleCompleted(task: Task): Promise<void> {
		if (task.completed) {
			toast.error("La tarea ya estaba completada")
			return
		}
		try {
			await updateTask(task.id, {
				completed: true,
				title: task.title,
				description: task.description,
			}).then(() => {
				setTasks((prev) => prev.filter((t) => t.id !== task.id))
				setTasksCompleted((prev) => [...prev, { ...task, completed: true }])
				toast.success("Tarea completada!")
			})
		} catch (error) {
			toast.error(`${error}`)
		}
	}
	async function unToggleCompleted(task: Task): Promise<void> {
		if (!task.completed) {
			toast.error("La tarea no esta completada")
			return
		}
		try {
			await updateTask(task.id, {
				completed: false,
				title: task.title,
				description: task.description,
			}).then(() => {
				setTasksCompleted((prev) => prev.filter((t) => t.id !== task.id))
				setTasks((prev) => [...prev, { ...task, completed: false }])
				toast.success("Tarea por hacer")
			})
		} catch (error) {
			toast.error(`${error}`)
		}
	}

	async function createTask(task: Task) {
		setTasks((prev) => [...prev, task])
	}

	async function handlerOnOpen(task: Task) {
		setEditTask(task)
		setOnOpen(true)
	}

	return (
		<>
			<ModalUpdate
				onClose={() => setOnOpen(false)}
				onSave={onUpdateTask}
				open={onOpen}
				task={editTask}
			/>
			<div className="flex flex-row justify-between gap-6 w-full">
				<section className="w-full">
					<TaskForm onCreateTask={createTask} />
				</section>
				<section className="w-full  ">
					<UserTasks
						loading={loading}
						error={error}
						onToggleCompleted={toggleCompleted}
						tasks={tasks}
						onUpdateTask={onUpdateTask}
						onOpen={handlerOnOpen}
						onDelete={onDelete}
					/>
				</section>{" "}
				<section className="w-full   ">
					<UserTasksCompleted
						loading={loading}
						error={error}
						unToggleCompleted={unToggleCompleted}
						tasks={tasksCompleted}
					/>
				</section>
			</div>
		</>
	)
}
