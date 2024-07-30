import { z } from "zod";
import { mealSchema } from "./mealsSchema";

export const comidaPlanificadaSchema = z.object({
    meal: mealSchema,
    dishId: z.number(),
    date: z.date()
})