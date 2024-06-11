import type { z } from "zod";
import type { mealSchema } from "../schemas/mealsSchema";

export type Meal = z.infer<typeof mealSchema>