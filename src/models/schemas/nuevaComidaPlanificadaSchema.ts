import { number, z } from "zod";
import { mealSchema } from "./mealsSchema";
import { dishSchema } from "./dishSchema";

export const nuevaComidaPlanificada = z.object({
    id: z.number(),
    dish: dishSchema,
    meal: mealSchema,
    date: z.date()
}).array();