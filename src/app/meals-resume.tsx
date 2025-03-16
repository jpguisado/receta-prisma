'use client'

import { ReceiptText } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer"
import Link from "next/link";
import { use } from "react";
import { type PlannedMealType } from "~/models/types/plannedMeal";

export default function MealsResume({ todaysMeals }: { todaysMeals: Promise<PlannedMealType[]> }) {
    const meals = use(todaysMeals);
    return meals.map((meal) => {
        return <Card key={meal.id}>
            <CardHeader>
                <CardTitle>{meal.meal}</CardTitle>
                <CardDescription>{meal.dish?.name ?? <Link href={'/server-designer'}>Planificar</Link>}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-end">
                {meal.dish?.recipe ? (
                    <Drawer>
                        <DrawerTrigger><ReceiptText /></DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>{meal.dish?.name}</DrawerTitle>
                                <DrawerDescription>{meal.dish?.recipe}</DrawerDescription>
                            </DrawerHeader>
                        </DrawerContent>
                    </Drawer>
                ) : ''}
            </CardFooter>
        </Card>
    })
}