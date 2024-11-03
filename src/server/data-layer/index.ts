import type { BrandNewDish } from "~/models/types/dish.td";
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
 * Obtiene los platos del día actual
 * @returns Platos y días planificados para hoy
 */
export async function fetchTodaysDish(date: Date): Promise<plannedMeal[]> {
    const today = date;
    today.setUTCHours(0, 0, 0, 0); // Establece la hora a medianoche

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await db.plannedMeal.findMany({
        where: {
            plannedDay: {
                day: {
                    gte: today,
                    lt: tomorrow
                }
            }
        },
        include: {
            plannedDay: true,
            dish: true
        }
    });
}

export async function countDishes(): Promise<number> {
    return await db.dish.count();
}

export async function countPlannedMeals(): Promise<number> {
    return await db.plannedMeal.count();
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
 * Gets all the planned days of a week, including meals an dishes.
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
        }, orderBy: {
            day: "asc"
        }
    })

    // Sorts meals to show them in order
    comidaPlanificada.map((comida) => comida.plannedMeal.sort((a, b) => MEALS.indexOf(a.meal) - MEALS.indexOf(b.meal)))

    return comidaPlanificada;
}

/**
 * Gets all the meals of a day
 * @param plannedDayId ID of the day to be returned
 * @returns Meals of passed day
 */
export async function fetchMealsOfADay(plannedDayId: number) {
    return await db.plannedMeal.findMany({
        where: {
            plannedDayId: plannedDayId
        },
        include: {
            dish: true
        }
    })
}

export async function fetchIngredientsOnDishes(datesOfTheWeek: Date[]) {
    const filteredIngredients = await db.plannedMeal.findMany({
        select: {
            dish: {
                select: {
                    ingredients: {
                        select: {
                            ingredient: {
                                select: { name: true, id: true }
                            },
                            quantity: true,
                            quantityUnit: true,
                            isListedInShoppingList: true
                        },
                    }
                }
            }
        },
        where: {
            dish: {
                ingredients: {
                    every: {
                        isListedInShoppingList: { equals: false }
                    }
                }
            },
            plannedDay: {
                day: {
                    in: datesOfTheWeek
                }
            }
        },
    })
    return filteredIngredients.flatMap((dishList) => {
        return dishList.dish.ingredients.flatMap((dish) => {
            return {
                name: dish.ingredient.name,
                quantity: dish.quantity,
                quantityUnit: dish.quantityUnit,
                isListedInShoppingList: dish.isListedInShoppingList
            }
        })
    })
}

export async function fetchElementsOnShoppingList() {
    return await db.shoppingList.findMany({
        where: {
            isBought: false
        }
    })
}