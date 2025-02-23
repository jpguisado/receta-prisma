'use client'
import { use } from "react";
import type { DishListType } from "~/models/types/dish.type";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import Link from "next/link";
import { CookingPotIcon, ReceiptText } from "lucide-react";
export default function DishList({ dishList }: { dishList: Promise<DishListType> }) {

    const awaitedDishList = use(dishList)

    return (
        <div className="flex flex-col gap-3">
            {awaitedDishList.map((dish) => {
                return (
                    <Card key={dish.id}>
                        <CardHeader>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardDescription>{dish.recipe ? dish?.recipe : <Link href={'/server-designer'}>Añadir receta</Link>}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-end">
                            <CookingPotIcon />
                            <ReceiptText />
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}