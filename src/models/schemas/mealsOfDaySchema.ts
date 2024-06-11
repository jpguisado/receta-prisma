import { z } from "zod";
import { mealSchema } from "../schemas/mealsSchema";
import { daySchema } from "../schemas/daySchema";

export const mealsOfDaySchema = z.object({
    weekDay: daySchema,
    mealList: mealSchema.array(),
})