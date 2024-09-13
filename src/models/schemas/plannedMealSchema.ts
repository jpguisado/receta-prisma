import { z } from "zod";
import { mealSchema } from "./mealsSchema";
import { dishSchema } from "./dishSchema";

export const plannedMealSchema = z.object({
    id: z.number(),
    dish: dishSchema,
    meal: mealSchema,
})

export const plannedMealSchemaBulk = z.object({
    id: z.number(),
    dish: dishSchema,
    meal: mealSchema,
})