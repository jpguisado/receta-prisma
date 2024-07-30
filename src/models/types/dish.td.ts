import type { z } from "zod";
import type { createDishSchema, dishSchema } from "../schemas/dishSchema";

export type Dish = z.infer<typeof dishSchema>

export type newDish = z.infer<typeof createDishSchema>