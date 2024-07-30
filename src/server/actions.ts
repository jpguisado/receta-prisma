"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";
import { createPlannedDaySchema } from "~/models/schemas/plannedDaySchema";
import type { createPlannedDay } from "~/models/types/plannedDay.td";
import type { Dish } from "~/models/types/dish.td";
import { createDishSchema } from "~/models/schemas/dishSchema";

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
    const { name, ingredientList } = createDishSchema.parse(data);
    if (ingredientList) {
        await db.dish.create({
            data: {
                name: name,
                ingredients: {
                    create: ingredientList.map((ingredient) => {
                        return { ingredient: { create: { name: ingredient.name } } }
                    }),
                },
            }
        })
    }
}