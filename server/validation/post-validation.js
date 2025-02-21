import z, {optional} from 'zod';
import mongoose from "mongoose";
import {Post} from "../model/dao/entity/post.js";
import {PostRepository} from "../model/dao/repository/post-repository.js";
import {CommentRepository} from "../model/dao/repository/comment-repository.js";

const INVALID_POST_TITLE_LENGTH = "Le titre du post doit contenir au minimum 3 caractères.";
const INVALID_POST_CONTENT_LENGTH = "Le contenu du post doit contenir au minimum 50 caractères.";
const INVALID_ID_FORMAT = "L'id n'est pas valide.";
const INVALID_AUTHOR_ID = "L'auteur n'existe pas.";
const INVALID_COMMENT_ID = "Le commentaire n'existe pas.";

const createSchemaValidation = z.object({
    title: z.string().min(3, INVALID_POST_TITLE_LENGTH),
    content: z.string().min(50, INVALID_POST_CONTENT_LENGTH),
    author: z.string()
        .refine((value) => mongoose.Types.ObjectId.isValid(value), INVALID_ID_FORMAT)
        .refine( (value) => {
            if (PostRepository.getById(value) === null) {
                return false;
            }
            return true;
        }, INVALID_AUTHOR_ID)
        .optional(),
    comments: z.array(
        z.string()
            .refine((value) => mongoose.Types.ObjectId.isValid(value), INVALID_ID_FORMAT)
            .refine( (value) => {
                if (CommentRepository.getById(value) === null) {
                    return false;
                }
                return true;
            }, INVALID_COMMENT_ID)
    ).optional()
});

export function createPostValidation(data) {
    return createSchemaValidation.safeParse(data);
};

const updateSchemaValidation = z.object({
    _id: z.string()
        .refine(value => mongoose.Types.ObjectId.isValid(value), INVALID_ID_FORMAT),
    title: z.string().min(3, INVALID_POST_TITLE_LENGTH),
    content: z.string().min(50, INVALID_POST_CONTENT_LENGTH),
    author: z.string()
        .refine((value) => mongoose.Types.ObjectId.isValid(value), INVALID_ID_FORMAT)
        .refine(async (value) => {
            if (!await PostRepository.getById(value) === null) {
                return false;
            }
            return true;
        }, INVALID_AUTHOR_ID)
        .optional(),
    comments: z.array(
        z.string()
            .refine((value) => mongoose.Types.ObjectId.isValid(value), INVALID_ID_FORMAT)
            .refine((value) => {
                if (CommentRepository.getById(value) === null) {
                    return false;
                }
                return true;
            }, INVALID_COMMENT_ID)
    ).optional()
});

export function updatePostValidation(data) {
    return updateSchemaValidation.safeParse(data);
};

const getByIdSchemaValidation = z.object({
    id: z.string()
        .refine(value => mongoose.Types.ObjectId.isValid(value), INVALID_ID_FORMAT)
});

export function getByIdPostValidation(data) {
    return getByIdSchemaValidation.safeParse(data);
}

const getByIdAndUserIdSchemaValidation = z.object({
    id: z.string()
        .refine(value => mongoose.Types.ObjectId.isValid(value), INVALID_ID_FORMAT),
    userId: z.string()
        .refine(value => mongoose.Types.ObjectId.isValid(value), INVALID_ID_FORMAT)
});

export function getByIdAndUserIdPostValidation(data) {
    return getByIdAndUserIdSchemaValidation.safeParse(data);
}

const deleteByIdSchemaValidation = z.object({
    id: z.string()
        .refine(value => mongoose.Types.ObjectId.isValid(value), INVALID_ID_FORMAT)
});

export function deleteByIdPostValidation(data) {
    return deleteByIdSchemaValidation.safeParse(data);
}