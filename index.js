import express from 'express';
import { reqisterValidation, loginValidation } from './validations/auth.js';
import mongoose from 'mongoose';
import cors from 'cors'
import { TasksController, UserController } from './controllers/index.js';
import { createTasksValidation } from './validations/createTasks.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
mongoose.connect(
	process.env.MONGODB_URI
)
	.then(() => console.log('DB ok'))
	.catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
	res.send('helloworld')
});
app.post('/auth/reqistration', reqisterValidation, handleValidationErrors, UserController.registration);
app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/tasks', checkAuth, createTasksValidation, handleValidationErrors, TasksController.create);
app.get('/tasks', checkAuth, TasksController.getTasks);
app.patch('/tasks', checkAuth, createTasksValidation, handleValidationErrors, TasksController.update);
app.listen(process.env.PORT || 4444, (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Server Ok')
});