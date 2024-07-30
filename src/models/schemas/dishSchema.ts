import { z } from "zod";
import { createIngredientSchema, ingredientSchema } from "./ingredientSchema";

export const dishSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    ingredientList: ingredientSchema.array().optional()
});

export const createDishSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    ingredientList: createIngredientSchema.array().optional()
});