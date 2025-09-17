// pages/Dashboard.tsx
import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import TaskForm from "../components/TaskForm"
import UserTasks from "../components/UserTasks"
import { getTasks, updateTask } from "../lib/lib"
import type { Task } from "../types/task-type"
import UserTasksCompleted from "./UserTaskCompleted"

export default function Dashboard() {
	const [tasks, setTasks] = useState<Task[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [tasksCompleted, setTasksCompleted] = useState<Task[]>([])

	useEffect(() => {
		async function fetchTasks() {
			try {
				const data = await getTasks()
				const completedTasks = data.filter((t) => t.completed)
				const tasks = data.filter((t) => !t.completed)
				setTasks(tasks)
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
	return (
		<>
			<section className="bg-white rounded-2xl shadow-sm border p-5">
				<h2 className="text-lg font-semibold mb-3">
					Taskify • ¡Crea tu nueva tarea!
				</h2>
				<TaskForm onCreateTask={createTask} />
			</section>
			<section className="bg-white rounded-2xl shadow-sm border p-5 xl:col-span-2">
				<UserTasks
					loading={loading}
					error={error}
					onToggleCompleted={toggleCompleted}
					tasks={tasks}
				/>
			</section>{" "}
			<section className="bg-white rounded-2xl shadow-sm border p-5 xl:col-span-2">
				<UserTasksCompleted
					loading={loading}
					error={error}
					unToggleCompleted={unToggleCompleted}
					tasks={tasksCompleted}
				/>
			</section>
		</>
	)
}
