import type { z } from "zod";
import type { createDishSchema, dishSchema, editDishSchema } from "../schemas/dishSchema";

export type Dish = z.infer<typeof dishSchema>

export type newDish = z.infer<typeof createDishSchema>

export type editDishType = z.infer<typeof editDishSchema>