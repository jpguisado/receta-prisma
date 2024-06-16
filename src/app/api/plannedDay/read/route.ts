import { plannedDay } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { mealsOfDay } from "~/models/types/mealsOfDay.td";
import { db } from "~/server/db";

const checkDbType: plannedDay = {
    id: 0,
    day: new Date()
}

const checkZodType: mealsOfDay = [{
    id: 0,
    day: new Date(),
    plannedMeal: [{
        id: 0,
        meal: 'BREAKFAST',
        dish: {name: 'Tortilla', ingredientList: []}
    }]
}] 

export async function GET() {
    try {
        const data = await db.plannedDay.findMany({
            include: { plannedMeal: { include: {dish: true}}}
        })
        return NextResponse.json(data)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }
    }
}
