import express from 'express';
import { reqisterValidation, loginValidation } from './validations/auth.js';
import mongoose from 'mongoose';
import cors from 'cors'
import { TasksController, UserController } from './controllers/index.js';
import { createTasksValidation } from './validations/createTasks.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';

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

app.post('/tasks', checkAuth, createTasksValidation, handleValidationErrors, TasksController.create);
app.get('/tasks', checkAuth, TasksController.getAll);
app.get('/tasks/:id', checkAuth, TasksController.getOne);
app.patch('/tasks/:id', checkAuth, TasksController.updateTitle);
app.patch('/tasks/:id/description', checkAuth, TasksController.updateDescription);
app.patch('/tasks', checkAuth, TasksController.changeStage);
app.delete('/tasks/:id', checkAuth, TasksController.removeTask);

app.listen(process.env.PORT || 4444, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server Ok')
}); 