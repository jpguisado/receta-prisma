import type { BrandNewDish, Dish, newDish } from "~/models/types/dish.td";
import { db } from "../db";
import type { plannedMeal } from "~/models/types/plannedMeal.td";
import type { plannedDay } from "~/models/types/plannedDay.td";

/**
 * Gets all dishes in database
 * @returns 
 */
export async function fetchDishList(): Promise<BrandNewDish[]> {
    const dishes = await db.dish.findMany({ include: { ingredients: { include: { ingredient: true } } } })
    return dishes;
}

/**
 * Fetch a dish with an id
 * @param id 
 */
export async function fetchDishWithId(id: number): Promise<BrandNewDish> {
    const { name, ingredients, recipe } = await db.dish.findUniqueOrThrow({
        select: {
            name: true,
            id: true,
            recipe: true,
            ingredients: {
                include: {
                    ingredient: true
                }
            },
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
            'ingredientId': item.ingredient.id,
        };
    })
    const dish: BrandNewDish = {
        name: name,
        ingredients: ingredients,
        recipe: recipe,
        id: id
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
    const MEALS = ['BREAKFAST', 'MIDMORNING', 'LUNCH', 'SNACK', 'DINNER'];
    const comidaPlanificada = await db.plannedDay.findMany({
        include: {
            plannedMeal: {
                select: {
                    dish: true,
                    meal: true,
                    dishId: true,
                    id: true
                }
            }
        }, where: {
            day: {
                in: datesOfTheWeek
            }
        }
    })
    
    // Sorts meals to show them in order
    comidaPlanificada.map((comida) => comida.plannedMeal.sort((a,b) =>  MEALS.indexOf(a.meal) - MEALS.indexOf(b.meal)))

    return comidaPlanificada;
}