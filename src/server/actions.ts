import { db } from "./db";
import { plannedDaySchema } from "~/models/schemas/plannedDaySchema";

const createPlannedDay = plannedDaySchema;

export async function createMealsForWeek(formData: FormData) {
    'use server';
    
    console.log('Log: ', formData)

    // Falla el parseo
    // const { id, day, plannedMeal } = createPlannedDay.parse(Object.fromEntries(formData.entries()))

    await db.plannedDay.create({
        data: {
            day: new Date(),
            plannedMeal: {
                create: {
                    dishId: 1,
                    meal: 'BREAKFAST'
                }
            }
        }
    })
}