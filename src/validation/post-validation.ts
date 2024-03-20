import { z, ZodType } from "zod";

export class PostValidation {
    static readonly CREATE: ZodType = z.object({
        title: z.string().min(1).max(100),
        content: z.string().min(1),
    })

    static readonly UPDATE: ZodType = z.object({
        title: z.string().min(1).max(100).optional(),
        content: z.string().min(1).optional(),
    })
}