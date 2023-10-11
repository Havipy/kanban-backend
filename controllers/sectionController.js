import SectionModel from "../models/Section.js";
import TaskModel from '../models/Task.js';
import BoardModel from '../models/Board.js';

export const createSection = async (req, res) => {
	try {
		const boardId = req.body.boardId;
		const section = await SectionModel.create({
			title: req.body.title,
			board: boardId,
		});
		await BoardModel.findByIdAndUpdate(boardId, { $push: { sectionIds: section._id } });
		res.json(section.getPublicFields());
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось создать секцию'
		});
	}
}
export const updateTaskIdsList = async (req, res) => {
	try {
		const { index } = req.body;
		const sectionId = req.params.id;
		const section = await SectionModel.findById(sectionId);
		const newTaskIds = section.tasksIds;
		newTaskIds.splice(index, 1);
		await SectionModel.findByIdAndUpdate(sectionId, { tasksIds: newTaskIds });
		res.json('success');
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось обновить секцию'
		});
	}
}

export const moveTasksBetweenSections = async (req, res) => {
	try {
		const startSectionId = req.body.startSection._id;
		const endSectionId = req.body.endSection._id;
		await SectionModel.findByIdAndUpdate(startSectionId, { tasksIds: req.body.startSection.tasksIds });
		await SectionModel.findByIdAndUpdate(endSectionId, { tasksIds: req.body.endSection.tasksIds });
		res.json('success');
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось изменить порядок задач'
		});
	}
}

export const reorderTasksInSection = async (req, res) => {
	try {
		const sectionId = req.params.id;
		await SectionModel.findByIdAndUpdate(sectionId, { tasksIds: req.body.tasksIds }).select('tasksIds');
		res.json('success');
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось изменить порядок задач'
		});
	}
}
export const updateSectionTitle = async (req, res) => {
	try {
		const sectionId = req.params.id;
		const section = await SectionModel.findByIdAndUpdate(
			sectionId,
			{ title: req.body.title }
		).select('title tasksIds')
		res.json(section)
	} catch (err) {
		res.status(500).json({
			messege: 'Не удалось обновить секцию'
		})
	}
}
export const removeSection = async (req, res) => {
	try {
		const sectionId = req.params.id;
		const section = await SectionModel.findByIdAndDelete(sectionId);
		section.tasksIds.forEach(async (taskId) => await TaskModel.deleteOne({ _id: taskId }));
		res.json('success');
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось удалить секцию'
		})
	}
}

