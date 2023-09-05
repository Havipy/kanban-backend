
import TasksModel from '../models/Tasks.js';
export const create = async (req, res) => {
	try {
		const doc = new TasksModel({
			title: req.body.title,
			user: req.userId,
		})
		const task = await doc.save();
		res.json(task.getPublicFields());
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось создать задачу'
		})
	}
}
export const getAll = async (req, res) => {
	try {
		const tasks = await TasksModel.find({ user: req.userId }).select('description title stage');
		res.json(tasks)
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось получить задачи'
		})
	}
}
export const getOne = async (req, res) => {
	try {
		const taskId = req.params.id;
		const task = await TasksModel.findById(taskId).select('description title stage');;
		res.json(task);
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось получить задачу'
		})
	}
}
export const updateDescription = async (req, res) => {
	try {

		const filter = { _id: req.body._id };
		const update = { description: req.body.description };
		const opts = { new: true };
		const doc = await TasksModel.findOneAndUpdate(
			filter, update, opts
		).select('description title stage')

		res.json(doc);
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось обновить описание задачи'
		})
	}
}
export const changeStage = async (req, res) => {
	try {

		const taskId = req.body._id;
		const filter = { _id: taskId };
		const update = { $inc: { stage: 1 } };
		const opts = { new: true };
		const doc = await TasksModel.findOneAndUpdate(
			filter, update, opts
		).select('description title stage')

		res.json(doc);
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось обновить описание задачи'
		})
	}
}
export const updateTitle = async (req, res) => {
	try {
		const filter = { _id: req.params.id };
		const update = { title: req.body.title };
		const opts = { new: true };
		const doc = await TasksModel.findOneAndUpdate(
			filter, update, opts
		).select('description title stage')
		res.json(doc);
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось обновить описание задачи'
		})
	}
}
export const removeTask = async (req, res) => {
	try {
		const taskId = req.params.id;

		await TasksModel.deleteOne({ _id: taskId });

		res.json({ success: true });
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось обновить описание задачи'
		})
	}
}