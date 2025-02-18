import z from "zod";

export const registerSchema = z.object({
    username: z.string().min(3),
    email: z.string().email("L'adresse email est invalide."),
    password: z.string().min(8, {message: "Le mot de passe doit contenir au minimum 8 caractères."}),
    confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Le mot de passe et sa confirmation ne correspondent pas.",
    path: ["confirmPassword"]
});

export function registerValidation(data) {
    return registerSchema.safeParse(data);
}

export const loginSchema = z.object({
    email: z.string().email("L'adresse email est invalide."),
    password: z.string().min(8, {message: "Le mot de passe doit contenir au minimum 8 caractères."})
});

export function loginValidation(data) {
    return loginSchema.safeParse(data);
}