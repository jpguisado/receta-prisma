import { z } from "zod";
import { createIngredientSchema, editIngredientSchema, ingredientSchema, ingredientsOnDishesSchema } from "./ingredientSchema";

export const dishSchema = z.object({
    id: z.number().optional(),
    recipe: z.string().optional(),
    name: z.string().min(1),
    ingredientList: ingredientSchema.array().optional()
});

export const createDishSchema = z.object({
    id: z.number().optional(),
    recipe: z.string().optional(),
    name: z.string().min(1),
    ingredientList: createIngredientSchema.array().optional()
});

export const editDishSchema = z.object({
    id: z.number(),
    recipe: z.string().optional(),
    name: z.string().min(1),
    ingredientList: editIngredientSchema.array().optional()
});

export const brandNewDishSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    recipe: z.string().optional(),
    ingredients: ingredientsOnDishesSchema.array().optional()
});