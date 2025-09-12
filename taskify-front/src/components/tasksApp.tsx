import TaskForm from "./TaskForm"
import UserTasks from "./UserTasks"
import UserProfile from "./UserProfile"
import Navbar from "./NavBar"

export default function TasksApp() {
	return (
		<div className="grid grid-rows-1 bg-black justify align-center">
			<Navbar />
			<TaskForm />
			<UserTasks />
		</div>
	)
}
