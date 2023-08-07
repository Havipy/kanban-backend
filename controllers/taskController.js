import TasksModel from '../models/Tasks.js';
export const create = async (req, res) => {
	try {
		const doc = new TasksModel({
			tasks: req.body.tasks,
			user: req.userId,
		})
		const tasks = await doc.save();
		res.send(tasks)
	}
	catch (e) {
		console.log(e)
		res.status(500).json({
			messege: 'Не удалось создать задачи'
		})
	}
}
export const getTasks = async (req, res) => {
	try {
		const tasks = await TasksModel.findOne({ user: req.userId });
		console.log(tasks);
		res.send(tasks)

	}
	catch (e) {
		console.log(e)
		res.status(500).json({
			messege: 'Не удалось получить задачи'
		})
	}
}

export const update = async (req, res) => {
	try {
		console.log(req.body)
		await TasksModel.updateOne(
			{ user: req.userId },
			{
				tasks: req.body.tasks,
				user: req.userId,
			}
		)
		res.json({
			success: true
		})
	}
	catch (e) {
		console.log(e)
		res.status(500).json({
			messege: 'Не удалось обновить задачи'
		})
	}
}