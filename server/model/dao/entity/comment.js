import mongoose, {Schema} from "mongoose";

const commentSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    post: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    content: {type: String, required: true}
});

export const Comment = mongoose.model('Comment', commentSchema);