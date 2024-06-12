"use client";

import { useState } from "react"
import { type z } from "zod"
import { Button } from "~/components/ui/button"
import { Select, SelectContent, SelectTrigger, SelectValue } from "~/components/ui/select"

import { DayComponent } from "./components/Day";
import type { Day } from "~/models/types/day.td";
import type { Dish } from "~/models/types/dish.td";
import type { Meal } from "~/models/types/meal.td";
import type { plannedWeek } from "~/models/types/plannedWeek.td";
import { BreakfastIcon } from "./components/Icons/BreakfastIcon";
import { MidmorningIcon } from "./components/Icons/MidmorningIcon";
import { LunchIcon } from "./components/Icons/LunchIcon";
import { SnackIcon } from "./components/Icons/SnackIcon";
import { DinnerIcon } from "./components/Icons/DinnerIcon";

export default function WeeklyPlanner() {

    const [day, setDay] = useState<Day>();
    const [meal, setMeal] = useState<Meal>();
    const [dish, setDish] = useState<Dish>();
    const [plan, setPlanning] = useState<plannedWeek>([])

    

    return (
        <div className="gap-4 flex flex-col h-full">
            <div className="text-xl">Semana 1</div>

            <div className="flex justify-around">
                <Button onClick={() => setDay({ name: 'MONDAY', order: 0 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'MONDAY' ? 'bg-slate-400' : ''}`}>L</Button>
                <Button onClick={() => setDay({ name: 'TUESDAY', order: 1 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'TUESDAY' ? 'bg-slate-400' : ''}`}>M</Button>
                <Button onClick={() => setDay({ name: 'WEDNESDAY', order: 2 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'WEDNESDAY' ? 'bg-slate-400' : ''}`}>X</Button>
                <Button onClick={() => setDay({ name: 'THURSDAY', order: 3 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'THURSDAY' ? 'bg-slate-400' : ''}`}>J</Button>
                <Button onClick={() => setDay({ name: 'FRIDAY', order: 4 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'FRIDAY' ? 'bg-slate-400' : ''}`}>V</Button>
                <Button onClick={() => setDay({ name: 'SATURDAY', order: 5 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'SATURDAY' ? 'bg-slate-400' : ''}`}>S</Button>
                <Button onClick={() => setDay({ name: 'SUNDAY', order: 6 })} className={`flex border hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 justify-center items-center ${day?.name === 'SUNDAY' ? 'bg-slate-400' : ''}`}>D</Button>
            </div>

            <div className="flex gap-3 w-full justify-between">
                <div onClick={() => setMeal({ name: 'BREAKFAST', order: 0 })} className={`p-2 border-[1px] ${meal?.name === 'BREAKFAST' ? 'bg-slate-200' : ''}`}>
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
                </div>
            </div>

            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona el plato" />
                </SelectTrigger>
                <SelectContent>
                </SelectContent>
            </Select>

            <Button>Añadir</Button>

            <div className="flex flex-col overflow-y-scroll h-full gap-1">
                <DayComponent day="L"></DayComponent>
                <DayComponent day="M"></DayComponent>
                <DayComponent day="X"></DayComponent>
                <DayComponent day="J"></DayComponent>
                <DayComponent day="V"></DayComponent>
                <DayComponent day="S"></DayComponent>
                <DayComponent day="D"></DayComponent>
            </div>

        </div>
    )
}