"use server";

import { revalidatePath } from "next/cache";
import { brandNewDishSchema } from "~/models/schemas/dishSchema";
import { createPlannedDaySchema } from "~/models/schemas/plannedDaySchema";
import type { BrandNewDish, newDish } from "~/models/types/dish.td";
import type { createPlannedDay } from "~/models/types/plannedDay.td";
import { db } from "./db";
import type { ShoppableItemDosType } from "~/models/types/shoppingListItems.td";
import { ShoppingListItemsSchemaDos } from "~/models/schemas/shoppingListItems";

// const CreateInvoice = FormSchema.omit({ id: true, date: true });
//amount: z.coerce.number(),

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
    revalidatePath('/');
}

export async function createDish(data: BrandNewDish) {
    const { name, ingredients, recipe, kcal } = brandNewDishSchema.parse(data);
    try {
        await db.dish.create({
            data: {
                name: name,
                recipe: recipe,
                kcal: kcal,
                ingredients: {
                    create: ingredients ? ingredients.map((ingredient) => {
                        return {
                            quantity: ingredient.quantity,
                            quantityUnit: ingredient.quantityUnit,
                            ingredient: {
                                create: {
                                    name: ingredient.ingredient.name
                                }
                            }
                        }
                    }) : undefined
                },
            }
        });
        revalidatePath('/dish-list')
    } catch (error) {
        return {
            message: 'Database Error: Failed to Create Dish.',
        };
    }
}

export async function editDish(data: newDish): Promise<void> {
    const { id, name, ingredients, recipe, } = brandNewDishSchema.parse(data);
    await db.dish.update({
        data: {
            name: name,
            recipe: recipe,
        },
        where: {
            id: id
        }
    })

    if (ingredients) {
        // Updates each ingredient name
        for (const ingredient of ingredients) {
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
                    name: ingredient.ingredient.name,
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
                    name: ingredient.ingredient.name,
                },
            })
        }
    }

    revalidatePath('/dish-list/[]')
    revalidatePath('/dish-list')
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

export async function addItemsToShoppingList(items: ShoppableItemDosType) {

    const results = ShoppingListItemsSchemaDos.safeParse(items);

    if (!results.data?.items) {
        return null
    }

    const shoppingListItems = results.data.items.map((item) => {
        return ({
            name: item.name,
            isBought: false,
            quantity: item.quantity,
            quantityUnit: item.quantityUnit
        })
    })

    await db.shoppingList.createMany({
        data: shoppingListItems
    })
}

export async function markItemAsBought(id: number, status: boolean) {
    await db.shoppingList.update({
        data: {
            isBought: status
        },
        where: {
            id: id
        }
    })
}