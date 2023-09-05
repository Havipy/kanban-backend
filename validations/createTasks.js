import { body } from 'express-validator';
export const createTasksValidation = [
	body('title', 'Неверный формат заголовка').isString()
]