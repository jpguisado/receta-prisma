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
                        return { quantity: ingredient.quantity, quantityUnit: ingredient.quantityUnit, ingredient: { create: { name: ingredient.name } } }
                    }),
                },
            }
        })
    }
}