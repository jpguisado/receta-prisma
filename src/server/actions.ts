import { plannedMeal } from "~/models/schemas/plannedMealSchema";
import { db } from "./db";
import { plannedDaySchema } from "~/models/schemas/plannedDaySchema";
import { comidaPlanificadaSchema } from "~/models/schemas/comidaPlanificada";

const crearComidaPlanificada = comidaPlanificadaSchema;

export async function createMealsForWeek(formData: FormData) {
    'use server';
    
    console.log('Log: ', Object.fromEntries(formData.entries()))

    // Falla el parseo
    // const { meal, dish, date } = crearComidaPlanificada.parse(Object.fromEntries(formData.entries()))

    // await db.comidaPlanificada.create({
    //     data: {
    //         date: date,
    //         meal: meal,
    //         dish: {
    //             connect: dish
    //         }
    //     }
    // })
}