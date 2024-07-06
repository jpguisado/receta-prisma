import { z } from "zod";
import { mealSchema } from "./mealsSchema";
import { dishSchema } from "./dishSchema";

export const plannedMeal = z.object({
    id: z.number(),
    meal: mealSchema,
    dish: dishSchema,
})