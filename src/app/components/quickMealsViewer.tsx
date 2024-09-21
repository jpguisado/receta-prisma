'use client';

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { type plannedMeal } from "~/models/types/plannedMeal.td";

export const QuickMealsViewer = () => {

    async function fetchMeals(): Promise<plannedMeal[]> {
        const res = await fetch('api/planned-day/')
        return await res.json() as Promise<plannedMeal[]>;
    }

    const { data, isLoading} = useQuery({ queryKey: ['meals'], initialData: [], queryFn: fetchMeals });

    return (
        <Tabs defaultValue={data[0]?.meal} className="mb-8">
            <TabsList className="grid w-full grid-cols-5">
                {data.map((meal) => (
                    <TabsTrigger
                        key={meal.meal}
                        value={meal.meal}
                        className="flex flex-col items-center"
                    >
                        {/* <div className="w-6 h-6 mb-1">{meal.icon}</div> */}
                        <span className="text-xs">{meal.meal.toLowerCase()}</span>
                    </TabsTrigger>
                ))}
            </TabsList>
            {data.map((meal) => (
                <TabsContent key={meal.meal} value={meal.meal}>
                    <Card className="border-none bg-gradient-to-r from-primary/20 to-primary/5">
                        <CardContent className="p-6">
                            <div className="mb-4 flex items-center">
                                {/* <meal.icon className="w-10 h-10 text-primary mr-4" /> */}
                                <div>
                                    <h2 className="text-lg font-semibold">{meal.meal}</h2>
                                    <p key={meal.dish.id} className="text-2xl font-bold">
                                        {meal.dish.name}
                                    </p>
                                    <p className="text-muted-foreground">{meal.dish.recipe}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            ))}
        </Tabs>

    )
}