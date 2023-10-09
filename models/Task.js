import mongoose from 'mongoose';
const TaskSchema = new mongoose.Schema({
	title: {
		type: String,
		default: '',
	},
	description: {
		type: String,
		default: '',
	},
	board: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Board',
		required: true,
	},
},
	{
		timestamps: true,
	}
)

TaskSchema.methods.getPublicFields = function () {
	const returnObject = {
		_id: this._id,
		title: this.title,
		description: this.description
	};
	return returnObject;
};

export default mongoose.model('Task', TaskSchema)