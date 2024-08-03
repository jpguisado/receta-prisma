import type { Dish, newDish } from "~/models/types/dish.td";
import { db } from "../db";
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
 * Fetch a dish with an id
 * @param id 
 */
export async function fetchDishWithId(id: number): Promise<newDish> {
    const {name, ingredients, recipe} = await db.dish.findUniqueOrThrow({
        select: {
            name: true,
            ingredients: {
                select: {
                    ingredient: true,
                    quantity: true,
                    quantityUnit: true,
                    ingredientId: true
                }
            },
            id: true,
            recipe: true
        },
        where: {
            id: id
        }
    });
    const newDishList = ingredients.flatMap((item) => {
        return {
            'quantityUnit': item.quantityUnit,
            'quantity': item.quantity,
            'name': item.ingredient.name,
            'id': item.ingredient.id,
        };
    })
    const dish: newDish = {
        name: name,
        ingredientList: newDishList,
        recipe: recipe
    }
    return dish;
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