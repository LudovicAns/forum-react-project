import z from "zod";

const INVALID_POST_TITLE_LENGTH = "Le titre du post doit contenir au minimum 3 caractères.";
const INVALID_POST_CONTENT_LENGTH = "Le contenu du post doit contenir au minimum 50 caractères.";
const INVALID_ID_FORMAT = "L'id n'est pas valide.";
const INVALID_AUTHOR_ID = "L'auteur n'existe pas.";
const INVALID_COMMENT_ID = "Le commentaire n'existe pas.";

export const createSchemaValidation = z.object({
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