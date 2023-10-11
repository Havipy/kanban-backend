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
SectionSchema.methods.getPublicFields = function () {
	const returnObject = {
		_id: this._id,
		title: this.title,
		tasksIds: this.tasksIds
	};
	return returnObject;
};
export default mongoose.model('Section', SectionSchema)