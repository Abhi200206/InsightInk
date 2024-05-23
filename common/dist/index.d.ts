import z from "zod";
export declare const signupobj: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name?: string | undefined;
}, {
    email: string;
    password: string;
    name?: string | undefined;
}>;
export type SignupType = z.infer<typeof signupobj>;
export declare const signinobj: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninType = z.infer<typeof signinobj>;
export declare const Post: z.ZodObject<{
    title: z.ZodString;
    post: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    post: string;
}, {
    title: string;
    post: string;
}>;
export type CreatePostType = z.infer<typeof Post>;
export declare const payload: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    id: string;
}, {
    email: string;
    password: string;
    id: string;
}>;
export type UpdatePostType = z.infer<typeof payload>;
