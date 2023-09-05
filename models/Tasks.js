import mongoose from 'mongoose';
const TaskSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	stage: {
		type: Number,
		default: 1,
	},
	description: {
		type: String,
		default: '',
	},

	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	}
},
	{
		timestamps: true,
	}
)
TaskSchema.methods.getPublicFields = function () {
	const returnObject = {
		_id: this._id,
		title: this.title,
		stage: this.stage,
		description: this.description
	};
	return returnObject;
};

export default mongoose.model('Tasks', TaskSchema)