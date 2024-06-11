import type { z } from "zod";
import type { ingredientSchema } from "../schemas/ingredientSchema";

export type Ingredient = z.infer<typeof ingredientSchema>