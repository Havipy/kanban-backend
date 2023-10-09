import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	tasksIds: {
		type: Array,
		default: []
	},
	board: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Board',
		required: true,
	},
}, {
	timestamps: true
});

export default mongoose.model('Section', SectionSchema)