import type { Task } from "../types/task-type"
import TaskCard from "./Card"

interface Props {
	loading: boolean
	error: string | null
	tasks: Task[]
	unToggleCompleted: (task: Task) => Promise<void>
}

export default function UserTasksCompleted(props: Props) {
	const { loading, error, tasks, unToggleCompleted } = props
	return (
		<section className="flex flex-col  bg-white rounded-lg shadow-md  px-4 py-4 border w-max h-auto">
			<div className="border rounded-lg p-2  text-center w-full ">
				<h2 className="font-bold">Tus tareas completadas</h2>
				<p>😍</p>
			</div>
			{loading && <p className="text-gray-600">Cargando tareas...</p>}
			{error && <p className="text-gray-600">{error}</p>}

			{!loading && !error && (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 overflow-y-auto mt-4 h-96">
					{tasks.length === 0 ? (
						<p className="text-gray-600">No hay tareas todavía</p>
					) : (
						tasks.map((t) => (
							<TaskCard
								handlerChange={unToggleCompleted}
								key={t.id}
								task={t}
								onOpen={(task) => console.log("abrir modal de ", task)}
							/>
						))
					)}
				</div>
			)}
		</section>
	)
}
