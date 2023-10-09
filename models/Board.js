import mongoose from "mongoose";

const BoardSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	sectionIds: {
		type: Array,
		default: []
	}
}, {
	timestamps: true
});

export default mongoose.model('Board', BoardSchema)