"use server";

import { revalidatePath } from "next/cache";
import { createDishSchema } from "~/models/schemas/dishSchema";
import { createPlannedDaySchema } from "~/models/schemas/plannedDaySchema";
import type { Dish } from "~/models/types/dish.td";
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

export async function createDish(data: Dish): Promise<void> {
    const { name, ingredientList, recipe, } = createDishSchema.parse(data);
    if (ingredientList) {
        await db.dish.create({
            data: {
                name: name,
                recipe: recipe,
                ingredients: {
                    create: ingredientList.map((ingredient) => {
                        return { quantity: ingredient.quantity, quantityUnit: ingredient.quantityUnit, ingredient: { create: { name: ingredient.name } } } // TODO: change this with PUT https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-scalar-lists-arrays#setting-the-value-of-a-scalar-list
                    }),
                },
            }
        })
    }
}

export async function editDish(data: Dish): Promise<void> {
    const { id, name, ingredientList, recipe, } = createDishSchema.parse(data);
    console.log('Estoy en el servidor')
    await db.dish.update({
        data: {
            name: name,
            recipe: recipe,
        },
        where: {
            id: 4
        }
    })

    // Updates each ingredient name
    for (const ingredient of ingredientList!) {
        await db.ingredient.update({
            data: {
                name: ingredient.name
            },
            where: {
                id: ingredient.ingredientId
            }
        })
    }

}

export async function deleteIngredientFromDish(dishId: number, ingredientId: number): Promise<void> {
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