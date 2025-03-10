"use server"
import { dishListSchema } from "~/models/schemas/dish";
import { db } from "./db";
import { plannedDaySchema, plannedWeekSchema } from "~/models/schemas/plannedDay";
import { MEALS } from "~/lib/utils";
import { plannedMealSchema } from "~/models/schemas/plannedMeal";

export async function fetchActiveWeekData(datesOfTheWeek: Date[]) {
    const existingDays = await db.plannedDay.findMany({
        where: {
            day: {
                in: datesOfTheWeek
            }
        }
    });
     
    const storedDays = existingDays.map((day) => day.day.getTime());
    const pendingDays = datesOfTheWeek.filter((day) => {
        return !storedDays.includes(day.getTime());
    });
    for (const element of pendingDays) {
        await db.plannedDay.create({
            data: {
                day: element,
            }
        }).then(async (day) => {
            for (const meal of MEALS) {
                await db.plannedMeal.create({
                    data: {
                        plannedDayId: day.id,
                        meal: meal
                    }
                })
            }
        })
    }

    const fetchedDays = await db.plannedDay.findMany({
        include: {
            plannedMeal: {
                select: {
                    dish: true,
                    meal: true,
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
    });
    fetchedDays.map((comida) => comida.plannedMeal.sort((a, b) => MEALS.indexOf(a.meal) - MEALS.indexOf(b.meal)))
    const { success, data, error } = plannedDaySchema.array().safeParse(fetchedDays);
    if (!success) throw new Error('Cannot fetch planned meals data.', error);
    return data;
}


// /**
//  * Gets all the planned days of a week, including meals an dishes.
//  * @param datesOfTheWeek An array containing dates to filter
//  * @returns the days of the week
//  */
// export async function fetchPlannedDays(datesOfTheWeek: Date[]) {
//     const MEALS = ['BREAKFAST', 'MIDMORNING', 'LUNCH', 'SNACK', 'DINNER', 'COMPLEMENTARY'];
//     const comidaPlanificada = await db.plannedDay.findMany({
//         include: {
//             plannedMeal: {
//                 select: {
//                     dish: true,
//                     meal: true,
//                     id: true
//                 }
//             }
//         }, where: {
//             day: {
//                 in: datesOfTheWeek
//             }
//         }, orderBy: {
//             day: "asc"
//         }
//     })

//     // Sorts meals to show them in order
//     comidaPlanificada.map((comida) => comida.plannedMeal.sort((a, b) => MEALS.indexOf(a.meal) - MEALS.indexOf(b.meal)))

//     const fillMeals = comidaPlanificada.map((dayInBBDD) => {
//         return {
//             ...dayInBBDD,
//             "plannedMeal": Array.from({ length: 6 }, (_, _index) => {
//                 return dayInBBDD.plannedMeal.find((mealsOfADay) => mealsOfADay.meal === MEALS[_index]!) ?? {
//                     id: Math.random(),
//                     dishId: Math.random(),
//                     dish: {
//                         id: Math.random(),
//                         name: '-'
//                     },
//                     meal: MEALS[_index]!
//                 }
//             })
//         }
//     });
//     const fillDays = datesOfTheWeek.map((dayInMemory) => {
//         return fillMeals.find((dayInBBDD) => dayInBBDD.day.getTime() === dayInMemory.getTime()) ?? {
//             "id": Math.random(),
//             "day": dayInMemory,
//             "plannedMeal": Array.from({ length: 6 }, (_, _index) => {
//                 return {
//                     id: _index,
//                     dish: {
//                         id: Math.random(),
//                         name: '-'
//                     },
//                     meal: MEALS[_index]!
//                 }
//             })
//         };
//     });
//     return fillDays;
// }

/**
 * Gets all the planned days of a week, including meals an dishes.
 * @param datesOfTheWeek An array containing dates to filter
 * @returns the days of the week
 */
export async function fetchPlannedMealsWellFormated(datesOfTheWeek: Date[]) {
    const week = await db.plannedDay.findMany({
        include: {
            plannedMeal: {
                include: {
                    plannedDay: false,
                    dish: {
                        include: {
                            ingredients: true
                        }
                    },
                }
            }
        }, where: {
            day: {
                in: datesOfTheWeek
            }
        }
    });
    const { success, data, error } = plannedWeekSchema.safeParse(week);
    if (!success) throw new Error('Cannot fetch planned meals data.', error);
    return data;
}

/**
 * Fetch list of dish
 * @returns 
 */
export async function fetchDishList(dishName: string) {
    const dishes = await db.dish.findMany({
        where: {
            name: {
                contains: dishName ?? undefined
            }
        }
    });
    const { success, data } = dishListSchema.safeParse(dishes);
    if (!success) throw new Error('Invalid dish data');
    return data;
}

export async function fetchTodaysMeals(day: Date) {
    return await db.plannedDay.findUnique(({
        where: {
            day: day
        },
        include: {
            plannedMeal: {
                include: {
                    dish: true
                }
            }
        }
    })).then((day) => {
        return plannedMealSchema.array().safeParse(day?.plannedMeal.sort((a, b) => MEALS.indexOf(a.meal) - MEALS.indexOf(b.meal))).data!
    });
}