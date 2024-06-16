'use client';

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type { Day } from "~/models/types/day.td";
import { BreakfastIcon } from "./components/Icons/BreakfastIcon";
import { DinnerIcon } from "./components/Icons/DinnerIcon";
import { LunchIcon } from "./components/Icons/LunchIcon";
import { MidmorningIcon } from "./components/Icons/MidmorningIcon";
import { SnackIcon } from "./components/Icons/SnackIcon";
import type { Meal } from "~/models/types/meal.td";
import { DayComponent } from "./components/Day";
import { useQuery } from "@tanstack/react-query";
import type { mealsOfWeek } from "~/models/types/mealsOfDay.td";
import type { Dish } from "~/models/types/dish.td";

export default function WeeklyPlanner() {

    const [day, setDay] = useState<Day>();
    const [meal, setMeal] = useState<Meal>('BREAKFAST');

    async function fetchPlannedDays() {
        return fetch("/api/plannedDay/read")
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<mealsOfWeek>
            })
    }

    async function fetchDishList() {
        return fetch("/api/dish/read")
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<Dish[]>
            })
    }

    const { data: mealsOfWeek, isLoading: isLoadingMealsOfWeek } = useQuery({ queryKey: ['mealsOfWeek'], queryFn: fetchPlannedDays });
    const { data: dishList, isLoading: isLoadingDishList } = useQuery({ queryKey: ['dishes'], queryFn: fetchDishList });

    if(!mealsOfWeek) {
        return <div>Hello World!</div>
    }

    if(!dishList) {
        return <div>Hello World!</div>
    }
 
    return (
        <div className="h-full overflow-hidden">
            <div className="h-[45%] gap-3 flex flex-col">
                <div className="text-2xl font-medium">Semana 56</div>
                <div className="flex w-full justify-around">
                    <Button onClick={() => setDay({ name: 'MONDAY', order: 0 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'MONDAY' ? 'bg-slate-400' : ''}`}>L</Button>
                    <Button onClick={() => setDay({ name: 'TUESDAY', order: 1 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'TUESDAY' ? 'bg-slate-400' : ''}`}>M</Button>
                    <Button onClick={() => setDay({ name: 'WEDNESDAY', order: 2 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'WEDNESDAY' ? 'bg-slate-400' : ''}`}>X</Button>
                    <Button onClick={() => setDay({ name: 'THURSDAY', order: 3 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'THURSDAY' ? 'bg-slate-400' : ''}`}>J</Button>
                    <Button onClick={() => setDay({ name: 'FRIDAY', order: 4 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'FRIDAY' ? 'bg-slate-400' : ''}`}>V</Button>
                    <Button onClick={() => setDay({ name: 'SATURDAY', order: 5 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'SATURDAY' ? 'bg-slate-400' : ''}`}>S</Button>
                    <Button onClick={() => setDay({ name: 'SUNDAY', order: 6 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'SUNDAY' ? 'bg-slate-400' : ''}`}>D</Button>
                </div>
                <div className="flex w-full justify-around">
{/*                     <div onClick={() => setMeal({ name: 'BREAKFAST', order: 0 })} className={`p-2 border-[1px] ${meal?.name === 'BREAKFAST' ? 'bg-slate-200' : ''}`}>
                        <BreakfastIcon />
                    </div>
                    <div onClick={() => setMeal({ name: 'BREAKFAST', order: 0 })} className={`p-2 border-[1px] ${meal?.name === 'MIDMORNING' ? 'bg-slate-200' : ''}`}>
                        <MidmorningIcon />
                    </div>
                    <div onClick={() => setMeal({ name: 'BREAKFAST', order: 0 })} className={`p-2 border-[1px] ${meal?.name === 'LUNCH' ? 'bg-slate-200' : ''}`}>
                        <LunchIcon />
                    </div>
                    <div onClick={() => setMeal({ name: 'BREAKFAST', order: 0 })} className={`p-2 border-[1px] ${meal?.name === 'SNACK' ? 'bg-slate-200' : ''}`}>
                        <SnackIcon />
                    </div>
                    <div onClick={() => setMeal({ name: 'BREAKFAST', order: 0 })} className={`p-2 border-[1px] ${meal?.name === 'DINNER' ? 'bg-slate-200' : ''}`}>
                        <DinnerIcon />
                    </div> */}
                </div>
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona el plato" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectGroup>
                            {
                                dishList.map((dish) => {
                                    return <SelectItem key={dish.id} value={dish.id.toString()}>{dish.name}</SelectItem>
                                })
                            }
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button className="w-full">Añadir</Button>
            </div>
            <div className="h-[55%] overflow-scroll">
                {mealsOfWeek.map((day) => {
                    return (
                        <DayComponent
                            key={day.id}
                            day={day.day}
                            plannedMeal={day.plannedMeal}
                            />
                    )
                })}
            </div>
        </div>
    )
}