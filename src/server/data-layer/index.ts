import type { Dish } from "~/models/types/dish.td";
import type { mealsOfWeek } from "~/models/types/mealsOfDay.td";
import { db } from "../db";

/**
 * Gets all dishes in database
 * @returns 
 */
export async function fetchDishList(): Promise<Dish[]> {
    const dishes = await db.dish.findMany()
    return dishes;
}

export async function fetchPlannedDays(): Promise<mealsOfWeek> {
    const plannedDays = await db.plannedDay.findMany({
        include:
            { plannedMeal: { include: { dish: true } } }
    })
    console.log(plannedDays)
    return plannedDays;
}