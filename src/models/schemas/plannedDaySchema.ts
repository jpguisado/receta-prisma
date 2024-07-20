import { z } from "zod";
import { plannedMealSchema } from "./plannedMealSchema";

export const plannedDaySchema = z.object({
    id: z.number(),
    day: z.date(),
    plannedMeal: z.lazy(() => plannedMealSchema.array()),
})