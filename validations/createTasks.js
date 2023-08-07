import { body } from 'express-validator';
export const createTasksValidation = [
	body('tasks', 'Неверный формат задач').isArray()
]