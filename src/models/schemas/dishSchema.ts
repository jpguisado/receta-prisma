import { z } from "zod";
import { ingredientSchema } from "./ingredientSchema";

export const dishSchema = z.object({
    id: z.number(),
    name: z.string().min(1),
    ingredientList: ingredientSchema.array().optional()
});