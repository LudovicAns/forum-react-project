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

        const createdComment = await CommentRepository.create(data);

        // Update the related post to include the new comment
        await PostRepository.updateById(data.post, {
            $push: {comments: createdComment._id}
        });

        await UserRepository.update(
            data.author,
            {
                $push: {comments: createdComment._id}
            });

        return createdComment;
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

        const comment = await CommentRepository.getById(data.id);

        if (!comment) {
            throw new Error('Comment not found');
        }

        if (data.author && data.author !== comment.author) {
            UserRepository.update(comment.author, {
               $pull: {comments: comment._id}
            });
            UserRepository.update(data.author, {
                $push: {comments: comment._id}
            });
        }

        if (data.post && data.post !== comment.post) {
            PostRepository.updateById(comment.post, {
               $pull: {comments: comment._id}
            });
            PostRepository.updateById(data.post, {
                $push: {comments: comment._id}
            });
        }

        return await CommentRepository.updateById(data._id, data);
    },

    deleteComment: async (data) => {
        const validation = validateDeleteByIdComment(data);

        if (!validation.success) {
            throw new Error(`Field '${validation.error.issues[0].path[0]}' : ${validation.error.issues[0].message}`);
        }

        PostRepository.updateById(data.post, {
            $pull: {comments: data.id}
        });

        UserRepository.update(data.author, {
            $pull: {comments: data.id}
        });

        return await CommentRepository.deleteById(data.id);
    }
}