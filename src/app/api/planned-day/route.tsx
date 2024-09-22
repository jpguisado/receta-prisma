import { db } from "~/server/db";

/**
 * Obtiene los platos del día actual
 * @returns Platos y días planificados para hoy
 */
export async function GET(): Promise<Response> {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); // Establece la hora a medianoche

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const meals = await db.plannedMeal.findMany({
        where: {
            plannedDay: {
                day: {
                    gte: today,
                    lt: tomorrow
                }
            }
        },
        include: {
            plannedDay: true,
            dish: true
        }
    });
    return Response.json(meals)
}