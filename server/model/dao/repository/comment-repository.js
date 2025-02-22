import {Comment} from "../entity/comment.js";
import {userDto} from "../../dto/user-dto.js";

const populateComment = [
    {
        path: 'author',
        transform: (doc, id) => {
            return userDto(doc);
        }
    },
    {
        path: 'post',
        transform: (doc, id) => {
            return {
                ...doc,
                author: userDto(doc.author)
            }
        }
    }
]

export const CommentRepository = {
    create: async function (comment) {
        const newComment = new Comment(comment);
        return await newComment.save();
    },

    getById: async function (id) {
        try {
            return await Comment.findOne({_id: id}).populate(populateComment).exec();
        } catch (error) {
            return null;
        }
    },

    getAll: async function () {
        return await Comment.find().populate(populateComment).exec();
    },

    updateById: async function (id, newComment) {
        return await Comment.findByIdAndUpdate(id, newComment).populate(populateComment).exec();
    },

    deleteById: async function (id) {
        return await Comment.findByIdAndDelete(id).populate(populateComment).exec();
    }
};