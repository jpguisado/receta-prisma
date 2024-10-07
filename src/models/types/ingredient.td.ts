import type { z } from "zod";
import type { ingredientSchema, ingredientsOnDishesSchema } from "../schemas/ingredientSchema";

export type Ingredient = z.infer<typeof ingredientSchema>

export type IngredientInDishes = z.infer<typeof ingredientsOnDishesSchema>