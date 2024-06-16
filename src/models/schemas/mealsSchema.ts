import { z } from "zod";

export const mealSchema = z.union([
    z.literal('BREAKFAST'),
    z.literal('MIDMORNING'),
    z.literal('LUNCH'),
    z.literal('DINNER'),
    z.literal('SNACK'),
    z.literal('COMPLEMENTARY'),
])