import type { z } from "zod";
import type { plannedWeekSchema } from "../schemas/plannedWeekSchema";

export type plannedWeek = z.infer<typeof plannedWeekSchema>