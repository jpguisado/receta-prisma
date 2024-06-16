import type { z } from "zod";
import type { mealsOfWeekSchema } from "../schemas/mealsOfDaySchema";

export type mealsOfWeek = z.infer<typeof mealsOfWeekSchema>