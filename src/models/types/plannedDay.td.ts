import type { z } from "zod";
import type { plannedDaySchema } from "../schemas/plannedDaySchema";

export type PlannedDay = z.infer<typeof plannedDaySchema>