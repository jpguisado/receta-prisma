import type { z } from "zod";
import type { plannedMeal } from "../schemas/plannedMealSchema";

export type plannedMeal = z.infer<typeof plannedMeal>