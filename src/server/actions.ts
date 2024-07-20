"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { comidaPlanificadaSchema } from "~/models/schemas/comidaPlanificadaSchema";
import type { comidaPlanificada } from "~/models/types/comidaPlanificada.td";
import { plannedDaySchema } from "~/models/schemas/plannedDaySchema";

const newPlannedDay = plannedDaySchema;

export async function createMealsForWeek(data: comidaPlanificada) {
    const { day, plannedMeal } = plannedDaySchema.parse(data);
    await db.plannedDay.create({
        data: {
            day: day,
            plannedMeal: [plannedMeal]
            }
        }
    });
    revalidatePath('/concept-form');
}