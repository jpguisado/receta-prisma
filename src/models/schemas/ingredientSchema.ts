import { z } from "zod";

export const ingredientSchema = z.object({
    id: z.number(),
    name: z.string().min(1)
});