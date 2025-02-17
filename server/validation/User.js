import z from 'zod';

const registerSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8)
});

export function registerValidation(data) {
    return registerSchema.safeParse(data);
}

const loginSchema = z.object({
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8)
}).refine(data => {
    return data.username || data.email;
}, {
    message: 'username or email is required',
    path: ['username', 'email']
})

export function loginValidation(data) {
    return loginSchema.safeParse(data);
}