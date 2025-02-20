import {Post} from "../entity/Post.js";

export const PostRepository = {
    create: async function (post) {
        const newPost = new Post(post);
        return await newPost.save();
    },

    getById: async function (id) {
        try {
            return await Post.findOne({_id: id});
        } catch (error) {
            return null;
        }
    },

    getAll: async function () {
        return await Post.find();
    },

    updateById: async function (id, newPost) {
        return await Post.findByIdAndUpdate(id, newPost, {new: true});
    },

    deleteById: async function (id) {
        return await Post.findByIdAndDelete(id);
    }
};