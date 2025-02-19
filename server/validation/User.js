import z from 'zod';

const INVALID_EMAIL_MESSAGE = "L'adresse email est invalide.";
const INVALID_PASSWORD_LENGTH_MESSAGE = "Le mot de passe doit contenir au minimum 8 caractères.";
const INVALID_USERNAME_LENGTH_MESSAGE = "Le nom d'utilisateur doit contenir au minimum 3 caractères.";

const registerSchema = z.object({
    username: z.string().min(3, INVALID_USERNAME_LENGTH_MESSAGE),
    email: z.string().email(INVALID_EMAIL_MESSAGE),
    password: z.string().min(8, INVALID_PASSWORD_LENGTH_MESSAGE)
});

export function registerValidation(data) {
    return registerSchema.safeParse(data);
}

const loginSchema = z.object({
    username: z.string().min(3, INVALID_USERNAME_LENGTH_MESSAGE).optional(),
    email: z.string().email(INVALID_EMAIL_MESSAGE).optional(),
    password: z.string().min(8, INVALID_PASSWORD_LENGTH_MESSAGE).optional()
}).refine(data => {
    return data.username || data.email;
}, {
    message: 'username or email is required',
    path: ['username', 'email']
})

export function loginValidation(data) {
    return loginSchema.safeParse(data);
}

const updateSchema = z.object({
    username: z.string().min(3, INVALID_USERNAME_LENGTH_MESSAGE).optional(),
    email: z.string().email(INVALID_EMAIL_MESSAGE).optional(),
    password: z.string().min(8, INVALID_PASSWORD_LENGTH_MESSAGE).optional(),
    avatar: z.string().optional(),
    description: z.string().optional(),
});