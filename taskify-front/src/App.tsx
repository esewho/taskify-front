import React from "react"
import TaskForm from "./components/TaskForm"
import UserTasks from "./components/UserTasks"
import UserProfile from "./components/UserProfile"

export default function Taskify() {
	return (
		<div className="grid grid-cols-3 gap-4 h-fulloverflow-y-hidden justify-center bg-gray-100 align-items-center p-4 overflow-hidden items-end">
			<TaskForm />
			<UserTasks />
			<UserProfile />
		</div>
	)
}
