import {
    createPostValidation,
    deleteByIdPostValidation, getByIdAndUserIdPostValidation,
    getByIdPostValidation,
    updatePostValidation
} from "../validation/post-validation.js";
import {PostRepository} from "../model/dao/repository/post-repository.js";
import {UserRepository} from "../model/dao/repository/user-repository.js";

export const PostService = {
    addPost: async (data) => {
        const validation = createPostValidation(data);

        if (!validation.success) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await PostRepository.create(data);
    },

    getPosts: async ({page, limit}) => {
        return await PostRepository.getAll({page, limit});
    },

    getPostById: async (data) => {
        const validation = getByIdPostValidation(data);

        if (!validation.success) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await PostRepository.getById(data.id);
    },

    getPostByIdAndUserId: async (data) => {
        const validation = getByIdAndUserIdPostValidation(data);

        if (!validation.success) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await PostRepository.getByIdAndUserId(data.id, data.userId);
    },

    updatePost: async (data) => {
        const validation = updatePostValidation(data);

        if (!validation.success) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        await PostRepository.updateById(data._id, data);
    },

    deletePost: async (data) => {
        const validation = deleteByIdPostValidation(data);

        if (!validation.success) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await PostRepository.deleteById(data.id);
    }
};