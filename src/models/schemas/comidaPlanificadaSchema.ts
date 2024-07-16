import { z } from "zod";
import { mealSchema } from "./mealsSchema";
import { dishSchema } from "./dishSchema";

export const comidaPlanificadaSchema = z.object({
    meal: mealSchema,
    dish: dishSchema,
    date: z.date()
})