import type { z } from "zod";
import type { mealsOfDaySchema } from "../schemas/mealsOfDaySchema";

export type mealsOfDay = z.infer<typeof mealsOfDaySchema>