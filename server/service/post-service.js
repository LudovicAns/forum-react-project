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

        const newPost = await PostRepository.create(data);

        const author = await UserRepository.getById(data.author);
        author.posts.push(newPost._id);
        await author.save();
    },

    getPosts: async () => {
        return await PostRepository.getAll();
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

        const post = await PostRepository.getById(data._id);

        if (!post) {
            throw new Error('Post not found');
        }

        if (data.author && data.author !== post.author) {
            const oldAuthor = await UserRepository.getById(post.author.id);
            oldAuthor.posts.pull(post._id);
            await oldAuthor.save();
            const newAuthor = await UserRepository.getById(data.author);
            newAuthor.posts.push(post._id);
            await newAuthor.save();
        }

        await PostRepository.updateById(data._id, data);
    },

    deletePost: async (data) => {
        const validation = deleteByIdPostValidation(data);

        if (!validation.success) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        const post = await PostRepository.getById(data.id);

        if (!post) {
            throw new Error('Post not found');
        }

        const author = await UserRepository.getById(post.author.id);
        author.posts.pull(post._id);
        await author.save();

        return await PostRepository.deleteById(data.id);
    }
};