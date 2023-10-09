import express from 'express';
import { reqisterValidation, loginValidation } from './validations/auth.js';
import mongoose from 'mongoose';
import cors from 'cors'
import { SectionController, TaskController, UserController, BoardController } from './controllers/index.js';

import { checkAuth, handleValidationErrors } from './utils/index.js';
import { createSectionValidation } from './validations/createSection.js';

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb+srv://kirillmiravov:Hipster2003@kanban.nxo5crz.mongodb.net/kanban?retryWrites=true&w=majority'
)
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());
app.use(cors())

app.post('/auth/reqistration', reqisterValidation, handleValidationErrors, UserController.registration);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/tasks', checkAuth, TaskController.createTask);
app.patch('/tasks/:id', checkAuth, TaskController.updateTask);
app.delete('/tasks/:id', checkAuth, TaskController.removeTask);

app.patch('/sections', checkAuth, SectionController.moveTasksBetweenSections);
app.post('/sections', checkAuth, createSectionValidation, handleValidationErrors, SectionController.createSection);
app.patch('/sections/:id', checkAuth, SectionController.reorderTasksInSection);
app.delete('/sections/:id', checkAuth, SectionController.removeSection);
app.patch('/sections/:id/title', checkAuth, SectionController.updateSectionTitle)
app.patch('/sections/:id/tasks', checkAuth, SectionController.updateTaskIdsList);

app.get('/boards', checkAuth, BoardController.getAll);
app.post('/boards', checkAuth, BoardController.сreateBoard);
app.get('/boards/:boardId', checkAuth, BoardController.getOne);
app.patch('/boards/:boardId', checkAuth, BoardController.reorderSections);
app.patch('/boards/:boardId/sections', checkAuth, BoardController.updateSectionIdsList);
app.delete('/boards/:boardId', checkAuth, BoardController.removeBoard);


app.listen(process.env.PORT || 4444, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server Ok')
}); 