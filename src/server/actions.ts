"use server";

import { revalidatePath } from "next/cache";
import { brandNewDishSchema, createDishSchema } from "~/models/schemas/dishSchema";
import { createPlannedDaySchema } from "~/models/schemas/plannedDaySchema";
import type { BrandNewDish, Dish, newDish } from "~/models/types/dish.td";
import type { createPlannedDay } from "~/models/types/plannedDay.td";
import { db } from "./db";

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

export async function createDish(data: BrandNewDish): Promise<void> {
    const { name, ingredients, recipe, } = brandNewDishSchema.parse(data);

    try {
        console.log('Datos que vienen del form: ', ingredients);
        await db.dish.create({
            data: {
                name: name,
                recipe: recipe,
                ingredients: {
                    create: ingredients
                },
            }
        })

    } catch (error) {
        console.error(error)
    }

    // if (ingredientList) {
    //     await db.dish.create({
    //         data: {
    //             name: name,
    //             recipe: recipe,
    //             ingredients: {
    //                 create: ingredientList.map((ingredient) => {
    //                     return { 
    //                         quantity: ingredient.quantity, 
    //                         quantityUnit: ingredient.quantityUnit, 
    //                         ingredient: { 
    //                             create: { 
    //                                 name: ingredient.name 
    //                             } 
    //                         }
    //                     } // TODO: change this with PUT https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-scalar-lists-arrays#setting-the-value-of-a-scalar-list
    //                 }),
    //             },
    //         }
    //     }).catch((error) => {console.log(error)})
    // }


}

export async function editDish(data: newDish): Promise<void> {
    const { id, name, ingredientList, recipe, } = createDishSchema.parse(data);
    await db.dish.update({
        data: {
            name: name,
            recipe: recipe,
        },
        where: {
            id: id
        }
    })

    // Updates each ingredient name
    for (const ingredient of ingredientList!) {
        if (ingredient.ingredientId) {
            await db.ingredientsinDishes.updateMany({
                data: {
                    quantity: ingredient.quantity,
                    quantityUnit: ingredient.quantityUnit,
                },
                where: {
                    dishId: id,
                    ingredientId: ingredient.ingredientId,
                }
            })
        }

        await db.ingredient.upsert({
            where: {
                id: ingredient.ingredientId! | undefined!
            },
            create: {
                name: ingredient.name,
                dishes: {
                    createMany: {
                        data: {
                            dishId: id!,
                            quantity: ingredient.quantity,
                            quantityUnit: ingredient.quantityUnit
                        }
                    }
                }
            },
            update: {
                name: ingredient.name,
            },
        })
    }
    revalidatePath('/dish-list/[]')
    revalidatePath('/dish-list')
}

export async function deleteIngredientFromDish(dishId: number, ingredientId: number): Promise<void> {
    console.log(dishId, ingredientId)
    await db.ingredientsinDishes.deleteMany({
        where: {
            dishId: dishId,
            ingredientId: ingredientId
        }
    })
}

export async function deleteDishWithId(id: number) {
    await db.dish.delete({
        where: {
            id: id
        }
    })
    revalidatePath('/dish-list')
}