import type { z } from "zod";
import type { brandNewDishSchema, createDishSchema, dishSchema, editDishSchema } from "../schemas/dishSchema";

export type Dish = z.infer<typeof dishSchema>

export type BrandNewDish = z.infer<typeof brandNewDishSchema>

export type newDish = z.infer<typeof createDishSchema>

export type editDishType = z.infer<typeof editDishSchema>