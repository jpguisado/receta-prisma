import type { z } from "zod";
import type { plannedDaySchema } from "../schemas/plannedDaySchema";

export type plannedDay = z.infer<typeof plannedDaySchema>