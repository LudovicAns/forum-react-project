import {
    validateCreateComment,
    validateDeleteByIdComment,
    validateGetByIdComment,
    validateUpdateComment
} from "../validation/Comment.js";
import {CommentRepository} from "../model/dao/repository/CommentRepository.js";

export const CommentService = {
    addComment: async (data) => {
        const validation = validateCreateComment(data);

        if (!validation) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await CommentRepository.create(data);
    },

    getComments: async () => {
        return await CommentRepository.getAll();
    },

    getCommentById: async (data) => {
        const validation = validateGetByIdComment(data);

        if (!validation) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await CommentRepository.getById(data.id);
    },

    updateComment: async (data) => {
        const validation = validateUpdateComment(data);

        if (!validation) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await CommentRepository.updateById(data._id, data);
    },

    deleteComment: async (data) => {
        const validation = validateDeleteByIdComment(data);

        if (!validation) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        return await CommentRepository.deleteById(data.id);
    }
}