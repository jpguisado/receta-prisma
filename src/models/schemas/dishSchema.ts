import { z } from "zod";
import { ingredientSchema } from "./ingredientSchema";

export const dishSchema = z.object({
    name: z.string().min(1),
    ingredientList: ingredientSchema.array()
});