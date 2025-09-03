export const API = "http://localhost:3000"

export type Task = {
	id: number // tu Task.id ahora es Int
	title: string
	description?: string | null
	completed: boolean
	createdAt: string
	updatedAt: string
	userId?: number
}

export async function getTasks(email?: string): Promise<Task[]> {
	const qs = email ? `?email=${encodeURIComponent(email)}` : ""
	const res = await fetch(`${API}/tasks${qs}`)
	if (!res.ok) throw new Error("Error fetching tasks")
	return res.json()
}

export async function createTask(payload: {
	title: string
	description?: string
	completed?: boolean
	email: string
}) {
	const res = await fetch(`${API}/tasks/create`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	})
	if (!res.ok) throw new Error("Error creating task")
	return res.json() as Promise<Task>
}

export async function updateTask(
	id: number,
	payload: Partial<Pick<Task, "title" | "description" | "completed">> & {
		email?: string
	}
) {
	const res = await fetch(`${API}/tasks/${id}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	})
	if (!res.ok) throw new Error("Error updating task")
	return res.json() as Promise<Task>
}

export async function deleteTask(id: number) {
	const res = await fetch(`${API}/tasks/${id}`, { method: "DELETE" })
	if (!res.ok) throw new Error("Error deleting task")
}
