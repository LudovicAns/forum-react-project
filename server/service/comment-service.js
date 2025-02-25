import {
    validateCreateComment,
    validateDeleteByIdComment,
    validateGetByIdComment,
    validateUpdateComment
} from "../validation/comment-validation.js";
import {CommentRepository} from "../model/dao/repository/comment-repository.js";
import {PostRepository} from "../model/dao/repository/post-repository.js";
import {UserRepository} from "../model/dao/repository/user-repository.js";

export const CommentService = {
    addComment: async (data) => {
        const validation = validateCreateComment(data);

        if (!validation.success) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await CommentRepository.create(data);
    },

    getComments: async () => {
        return await CommentRepository.getAll();
    },

    getCommentById: async (data) => {
        const validation = validateGetByIdComment(data);

        if (!validation.success) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await CommentRepository.getById(data.id);
    },

    updateComment: async (data) => {
        const validation = validateUpdateComment(data);

        if (!validation.success) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await CommentRepository.updateById(data._id, data);
    },

    deleteComment: async (data) => {
        const validation = validateDeleteByIdComment(data);

        if (!validation.success) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await CommentRepository.deleteById(data.id);
    }
}