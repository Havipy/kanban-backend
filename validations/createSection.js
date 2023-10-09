import { body } from 'express-validator';

export const createSectionValidation = [
	body('title', 'Неверный формат заголовка').isString(),
]