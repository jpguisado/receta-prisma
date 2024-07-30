import type { z } from "zod";
import type { plannedMealSchema } from "../schemas/plannedMealSchema";

export type plannedMeal = z.infer<typeof plannedMealSchema>