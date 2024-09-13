import { z } from "zod";
import { plannedMealSchema } from "./plannedMealSchema";
import { mealSchema } from "./mealsSchema";

export const plannedDaySchema = z.object({
    id: z.number(),
    day: z.date(),
    plannedMeal: z.lazy(() => plannedMealSchema.array()),
});

export const plannedDaySchemaEditDishes = z.object({
    id: z.number().optional(),
    day: z.date().optional(),
    plannedMeal: z.lazy(() => plannedMealSchema.array()).optional(),
});

export const createPlannedDaySchema = z.object({
    day: z.date(),
    meal: mealSchema,
    dishId: z.number(),
})