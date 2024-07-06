import { z } from "zod";
import { plannedMeal } from "./plannedMealSchema";

export const plannedDaySchema = z.object({
    id: z.number(),
    day: z.date(),
    plannedMeal: plannedMeal
})