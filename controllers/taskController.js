import TaskModel from '../models/Task.js';
import SectionModel from '../models/Section.js';

export const createTask = async (req, res) => {
	try {
		const boardId = req.body.boardId;
		const sectionId = req.body.sectionId;
		const doc = new TaskModel({
			board: boardId
		});
		const task = await doc.save();
		await SectionModel.findByIdAndUpdate(sectionId, { $push: { tasksIds: task._id } });
		res.json(task.getPublicFields());
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось создать задачу'
		});
	}
}

export const updateTask = async (req, res) => {
	try {
		const taskId = req.params.id;
		const task = await TaskModel.findByIdAndUpdate(
			taskId,
			{
				title: req.body.title,
				description: req.body.description
			}).select('title description');
		res.json(task.getPublicFields());
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось обновить задачу'
		});
	}
}

export const removeTask = async (req, res) => {
	try {
		const taskId = req.params.taskId;
		await TaskModel.findByIdAndDelete(taskId);
		res.json('success');
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось удалить задачу'
		});
	}
}