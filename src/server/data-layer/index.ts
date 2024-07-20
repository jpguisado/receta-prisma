import type { Dish } from "~/models/types/dish.td";
import { db } from "../db";
import type { nuevaComidaPlanificada } from "~/models/types/nuevaComidaPlanificada.td";
import type { plannedMeal } from "~/models/types/plannedMeal.td";
import type { plannedDay } from "~/models/types/plannedDay.td";

/**
 * Gets all dishes in database
 * @returns 
 */
export async function fetchDishList(): Promise<Dish[]> {
    const dishes = await db.dish.findMany()
    return dishes;
}

/**
 * 
 * @returns 
 */
export async function fetchComidasPlanificadas(): Promise<plannedMeal[]> {
    const comidaPlanificada = await db.plannedMeal.findMany({
        include: { dish: true, plannedDay: true }
    })
    return comidaPlanificada;
}

/**
 * Gets all the dates of a week, including meals an dishes.
 * @param datesOfTheWeek An array containing dates to filter
 * @returns the days of the week
 */
export async function fetchPlannedDays(datesOfTheWeek: Date[]): Promise<plannedDay[]> {
    console.log(datesOfTheWeek)
    const comidaPlanificada = await db.plannedDay.findMany({
        include: {
            plannedMeal: {
                include: {
                    dish: true
                }
            }
        }, where: {
            day: {
                in: datesOfTheWeek
            }
        }
    })
    return comidaPlanificada;
}