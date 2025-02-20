import {
    createPostValidation,
    deleteByIdPostValidation,
    getByIdPostValidation,
    updatePostValidation
} from "../validation/Post.js";
import {PostRepository} from "../model/dao/repository/PostRepository.js";

export const PostService = {
    addPost: async (data) => {
        const validation = createPostValidation(data);

        if (!validation) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await PostRepository.create(data);
    },

    getPosts: async () => {
        return await PostRepository.getAll();
    },

    getPostById: async (data) => {
        const validation = getByIdPostValidation(data);

        if (!validation) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await PostRepository.getById(data.id);
    },

    updatePost: async (data) => {
        const validation = updatePostValidation(data);

        if (!validation) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await PostRepository.updateById(data._id, data);
    },

    deletePost: async (data) => {
        const validation = deleteByIdPostValidation(data);

        if (!validation) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await PostRepository.deleteById(data.id);
    }
};