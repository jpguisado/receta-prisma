import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";

export async function GET() {
    try {
        const data = await db.ingredient.findMany({})
        return NextResponse.json(data)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(error.message, { status: 400 })
        }
    }
}
