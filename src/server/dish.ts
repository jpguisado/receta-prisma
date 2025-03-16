"use server";

import { dishSchema } from "~/models/schemas/dish";
import type { DishType } from "~/models/types/dish.type";
import { db } from "./db";

export const fetchDishById = async (dishId: number) => {
    const res = await db.dish.findFirst({
        where: {
            id: dishId
        }
    });
    const { data } = dishSchema.safeParse(res);
    return data!;
}

export const createNewDish = async (data: DishType) => {
    await db.dish.create({
        data: {
            name: data.name,
            recipe: data.recipe,
            kcal: data.kcal,
        }
    })
}