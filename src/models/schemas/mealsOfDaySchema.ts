import { z } from "zod";
import { mealSchema } from "../schemas/mealsSchema";
import { dishSchema } from "./dishSchema";

export const mealsOfDaySchema = z.object({
    id: z.number(),
    day: z.date(),
    plannedMeal: z.object({
        id: z.number(),
        meal: mealSchema,
        dish: dishSchema,
    }).array(),
});

export const mealsOfWeekSchema = z.object({
    id: z.number(),
    day: z.date(),
    plannedMeal: z.object({
        id: z.number(),
        meal: mealSchema,
        dish: dishSchema,
    }).array(),
});