"use server"

import { MEALS } from "~/lib/utils";
import { db } from "~/server/db"

export async function GET(request: Request) {
    return await db.plannedDay.findUnique(({
        where: {
            day: new Date(),
        },
        include: {
            plannedMeal: {
                include: {
                    dish: true
                }
            }
        }
    })).then((day) => {
        return day?.plannedMeal.sort((a, b) => MEALS.indexOf(a.meal) - MEALS.indexOf(b.meal))
    }).then((res) => Response.json(res));
}