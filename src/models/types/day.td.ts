import type { z } from "zod";
import type { daySchema } from "../schemas/daySchema";

export type Day = z.infer<typeof daySchema>