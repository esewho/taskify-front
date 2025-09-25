import type { Task } from "../types/task-type"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

export async function getTasks(): Promise<Task[]> {
	const token = localStorage.getItem("accessToken")
	const response = await fetch(`${API_URL}/tasks`, {
		method: "GET",
		headers: {
			"Content-Type": "Application/json",
			Authorization: `Bearer ${token}`,
		},
	})
	if (!response.ok) {
		throw new Error("Error fetching tasks")
	}
	return response.json()
}

export async function createTask(
	task: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">
): Promise<Task> {
	const token = localStorage.getItem("accessToken")
	const response = await fetch(`${API_URL}/tasks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(task),
	})
	if (!response.ok) {
		throw new Error("Error creating task")
	}
	return response.json()
}

export async function updateTask(
	id: number,
	updates: Partial<Task>
): Promise<Task> {
	const token = localStorage.getItem("accessToken")
	const response = await fetch(`${API_URL}/tasks/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(updates),
	})
	if (!response.ok) {
		throw new Error("Error updating task")
	}
	return response.json()
}

export async function setTaskCompleted(id: string, completed: boolean) {
	const res = await fetch(`${API_URL}/tasks/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(completed),
	})
	if (!res.ok) {
		throw new Error("Fail to set completed")
	}
	return res.json()
}

export async function deleteTask(id: number): Promise<void> {
	const token = localStorage.getItem("accessToken")
	const response = await fetch(`${API_URL}/tasks/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
	if (!response.ok) {
		throw new Error("Error deleting task")
	}
	return response.json()
}

export async function register(
	email: string,
	password: string
): Promise<{ accessToken: string }> {
	const response = await fetch(`${API_URL}/auth/signup`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email: email, password: password }),
	})
	if (!response.ok) {
		throw new Error("Error creating user")
	}
	const data = await response.json()
	console.log(data)
	localStorage.setItem("accessToken", data.accessToken)
	return data
}

export async function login(
	email: string,
	password: string
): Promise<{ accessToken: string }> {
	const response = await fetch(`${API_URL}/auth/signin`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ email, password }),
	})
	if (!response.ok) {
		throw new Error("Error login")
	}

	const data = await response.json()

	localStorage.setItem("accessToken", data.accessToken)
	return data
}
