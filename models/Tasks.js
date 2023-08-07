import mongoose from 'mongoose';
const TasksSchema = new mongoose.Schema({
	tasks: {
		type: Array,
		required: true,
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

export default mongoose.model('Tasks', TasksSchema)