import {Comment} from "../entity/Comment.js";

export const CommentRepository = {
    create: async function (comment) {
        const newComment = new Comment(comment);
        return await newComment.save();
    },

    getById: async function (id) {
        try {
            return await Comment.findOne({_id: id});
        } catch (error) {
            return null;
        }
    },

    getAll: async function () {
        return await Comment.find();
    },

    updateById: async function (id, newComment) {
        return await Comment.findByIdAndUpdate(id, newComment);
    },

    deleteById: async function (id) {
        return await Comment.findByIdAndDelete(id);
    }
};