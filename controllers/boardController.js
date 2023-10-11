import TaskModel from '../models/Task.js';
import SectionModel from "../models/Section.js";
import BoardModel from "../models/Board.js";

export const getOne = async (req, res) => {
	try {
		const boardId = req.params.boardId;
		const board = await BoardModel.findById(boardId).select('title sectionIds user');
		const sections = await SectionModel.find({ board: boardId }).select('title tasksIds');
		const tasks = await TaskModel.find({ board: boardId }).select('title description');;
		res.json({ board, sections, tasks });
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось получить данные'
		});
	}
}
export const removeBoard = async (req, res) => {
	const boardId = req.params.boardId;
	await BoardModel.findByIdAndDelete(boardId);
	res.json('success')
}
export const getAll = async (req, res) => {
	try {
		const boards = await BoardModel.find({ user: req.userId }).select('title sectionIds user');;
		res.json(boards);
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось удалить доску'
		});
	}
}
export const сreateBoard = async (req, res) => {
	try {
		const userId = req.userId;
		const board = await BoardModel.create({
			title: req.body.title,
			user: userId,
		})
		res.json(board);
	}
	catch (e) {
		console.log(e);
		res.status(500).json({
			messege: 'Не удалось создать доску'
		});
	}
}
export const reorderSections = async (req, res) => {
	try {
		const boardId = req.params.boardId;
		const newSectionIds = req.body.newSectionIds;
		await BoardModel.findByIdAndUpdate(boardId, { sectionIds: newSectionIds });
		res.json('success')
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось поменять секции местами'
		});
	}
}
export const updateSectionIdsList = async (req, res) => {
	try {
		const boardId = req.params.boardId;
		const board = await BoardModel.findById(boardId);
		const sectionIndex = req.body.index;
		const newSectionIds = board.sectionIds;
		newSectionIds.splice(sectionIndex, 1);
		await BoardModel.findByIdAndUpdate(boardId, { sectionIds: newSectionIds });
		res.json('success');
	}
	catch (e) {
		res.status(500).json({
			messege: 'Не удалось обновить доску'
		});
	}
}