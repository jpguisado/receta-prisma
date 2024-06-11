import type { z } from "zod";
import type { dishSchema } from "../schemas/dishSchema";

export type Dish = z.infer<typeof dishSchema>