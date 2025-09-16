// pages/Dashboard.tsx
import TaskForm from "../components/TaskForm"
import UserTasks from "../components/UserTasks"

export default function Dashboard() {
	return (
		<>
			<section className="bg-white rounded-2xl shadow-sm border p-5">
				<h2 className="text-lg font-semibold mb-3">
					Taskify • ¡Crea tu nueva tarea!
				</h2>
				<TaskForm />
			</section>

			<section className="bg-white rounded-2xl shadow-sm border p-5 xl:col-span-2">
				<h2 className="text-lg font-semibold mb-3">Tus tareas</h2>
				<UserTasks />
			</section>
		</>
	)
}
