import { string, z } from "zod";
export const signupInput = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    password: z.string()
});
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string()
});
export const createPostInput = z.object({
    title: string(),
    content: string(),
});
export const updatePostInput = z.object({
    title: string(),
    content: string()
});
