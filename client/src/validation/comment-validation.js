import z from "zod";

const INVALID_CONTENT_LENGTH = "Le contenu doit contenir au minimum 10 caractères."

export const createSchemaValidation = z.object({
    content: z.string().min(10, INVALID_CONTENT_LENGTH)
});