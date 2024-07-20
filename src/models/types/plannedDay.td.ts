import type { z } from "zod";
import type { createPlannedDaySchema, plannedDaySchema } from "../schemas/plannedDaySchema";

export type plannedDay = z.infer<typeof plannedDaySchema>

export type createPlannedDay = z.infer<typeof createPlannedDaySchema>