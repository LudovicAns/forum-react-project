import {Post} from "../entity/post.js";
import {userDto} from "../../dto/user-dto.js";

const populatePost = [
    {
        path: 'author',
        transform: (doc, id) => userDto(doc)
    },
    {
        path: 'comments',
        transform: (doc, id) => {
            return {
                ...doc,
                author: userDto(doc.author)
            }
        }
    }
];

export const PostRepository = {
    create: async function (post) {
        const newPost = new Post(post);
        return await newPost.save();
    },

    getById: async function (id) {
        try {
            return await Post.findOne({_id: id}).populate(populatePost).exec();
        } catch (error) {
            return null;
        }
    },

    getByIdAndUserId: async function (id, userId) {
        try {
            return await Post.findOne({
                _id: id,
                author: userId
            }).populate(populatePost).exec();
        } catch (error) {
            return null;
        }
    },

    getAll: async function () {
        return await Post.find().populate(populatePost).exec();
    },

    updateById: async function (id, newPost) {
        return await Post.findByIdAndUpdate(id, newPost, {new: true}).populate(populatePost).exec();
    },

    deleteById: async function (id) {
        return await Post.findByIdAndDelete(id).populate(populatePost).exec();
    }
};