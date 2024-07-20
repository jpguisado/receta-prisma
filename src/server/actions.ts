"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { createPlannedDaySchema } from "~/models/schemas/plannedDaySchema";
import type { createPlannedDay } from "~/models/types/plannedDay.td";

export async function createMealsForWeek(data: createPlannedDay): Promise<void> {
    const { day, dishId, meal } = createPlannedDaySchema.parse(data);

    await db.plannedDay.upsert({
        create: {
            day: day,
            plannedMeal: {
                create: {
                    meal: meal,
                    dishId: dishId
                }
            }
        },
        update: {
            plannedMeal: {
                create: {
                    meal: meal,
                    dishId: dishId
                }
            }
        },
        where: {
            day: day
        }
    })
    revalidatePath('/concept-form');
}