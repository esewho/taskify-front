import type { Task } from "../types/task-type"
import TaskCard from "./Card"

interface Props {
	onOpen: (task: Task) => void
	loading: boolean
	error: string | null
	tasks: Task[]
	onToggleCompleted: (task: Task) => Promise<void>
	onUpdateTask: (task: Task, updates: Partial<Task>) => Promise<void>
}

export default function UserTasks(props: Props) {
	const { loading, error, tasks, onToggleCompleted, onUpdateTask, onOpen } =
		props
	return (
		<section className="flex flex-col justify-center items-center bg-white rounded-lg shadow-md px-4 py-4 w-max h-auto border">
			<div className="border rounded-lg p-2  text-center w-full ">
				<h2 className="font-bold">Tus tareas</h2>
				<p>😍</p>
			</div>
			{loading && <p className="text-gray-600">Cargando tareas...</p>}
			{error && <p className="text-gray-600">{error}</p>}

			{!loading && !error && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 overflow-y-auto mt-4 h-96">
					{tasks.length === 0 ? (
						<p className="text-gray-600">No hay tareas todavía</p>
					) : (
						tasks.map((t) => (
							<TaskCard
								handlerChange={onToggleCompleted}
								key={t.id}
								task={t}
								onOpen={onOpen}
								onUpdateTask={onUpdateTask}
							/>
						))
					)}
				</div>
			)}
		</section>
	)
}
