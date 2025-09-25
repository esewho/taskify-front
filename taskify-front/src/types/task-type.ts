export type Task = {
	id: number // coincide con el Task.id en tu DB
	title: string
	description?: string | null
	completed: boolean
	createdAt: string // llega como string (ISO date) en JSON
	updatedAt: string
	dueDate?: string | null
	userId?: number
}
