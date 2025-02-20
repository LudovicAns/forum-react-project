import z from "zod";
import mongoose from "mongoose";
import {UserRepository} from "../model/dao/repository/UserRepository.js";

const INVALID_MONGOOSE_OBJECT_ID = "L'id de l'auteur n'est pas valide."
const INVALID_AUTHOR_ID = "L'auteur n'existe pas."
const INVALID_CONTENT_LENGTH = "Le contenu doit contenir au minimul 10 caractères."

const createSchemaValidation = z.object({
    author: z.string()
        .refine(value => mongoose.Types.ObjectId.isValid(value), INVALID_MONGOOSE_OBJECT_ID)
        .refine(async (value) => {
            if (!await UserRepository.getById(value)) {
                return false;
            }
            return true;
        }, INVALID_AUTHOR_ID),
    content: z.string().min(10, INVALID_CONTENT_LENGTH)
});

export function validateCreateComment(data) {
    return createSchemaValidation.safeParse(data);
}

export function validateUpdateComment(data) {
    return createSchemaValidation.safeParse(data);
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

