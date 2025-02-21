import z from "zod";
import mongoose from "mongoose";
import {UserRepository} from "../model/dao/repository/user-repository.js";

const INVALID_MONGOOSE_OBJECT_ID = "L'id n'est pas valide."
const INVALID_AUTHOR_ID = "L'auteur n'existe pas."
const INVALID_CONTENT_LENGTH = "Le contenu doit contenir au minimul 10 caractères."

const createSchemaValidation = z.object({
    author: z.string()
        .refine(value => mongoose.Types.ObjectId.isValid(value), INVALID_MONGOOSE_OBJECT_ID)
        .refine((value) => {
            if (UserRepository.getById(value) === null) {
                return false;
            }
            return true;
        }, INVALID_AUTHOR_ID),
    content: z.string().min(10, INVALID_CONTENT_LENGTH)
});

export function validateCreateComment(data) {
    return createSchemaValidation.safeParse(data);
}

const updateSchemaValidation = z.object({
    _id: z.string()
        .refine(value => mongoose.Types.ObjectId.isValid(value), INVALID_MONGOOSE_OBJECT_ID),
    author: z.string()
        .refine(value => mongoose.Types.ObjectId.isValid(value), INVALID_MONGOOSE_OBJECT_ID)
        .refine((value) => {
            if (UserRepository.getById(value) === null) {
                return false;
            }
            return true;
        }, INVALID_AUTHOR_ID),
    content: z.string().min(10, INVALID_CONTENT_LENGTH)
});

export function validateUpdateComment(data) {
    return updateSchemaValidation.safeParse(data);
}

const getByIdSchemaValidation = z.object({
    id: z.string()
        .refine(value => mongoose.Types.ObjectId.isValid(value), INVALID_MONGOOSE_OBJECT_ID)
});

export function validateGetByIdComment(data) {
    return getByIdSchemaValidation.safeParse(data);
}

const deleteByIdSchemaValidation = z.object({
    id: z.string()
        .refine(value => mongoose.Types.ObjectId.isValid(value), INVALID_MONGOOSE_OBJECT_ID)
});

export function validateDeleteByIdComment(data) {
    return deleteByIdSchemaValidation.safeParse(data);
}

