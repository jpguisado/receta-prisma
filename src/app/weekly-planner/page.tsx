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

export default function WeeklyPlanner() {

    const [day, setDay] = useState<Day>();
    const [meal, setMeal] = useState<Meal>();
    const [dish, setDish] = useState<Dish>();
    const [plan, setPlanning] = useState<plannedWeek>([
        {
            day: { name: 'MONDAY', 'order': 0 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'TUESDAY', 'order': 1 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'WEDNESDAY', 'order': 2 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'THURSDAY', 'order': 3 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'FRIDAY', 'order': 4 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'SATURDAY', 'order': 5 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'SUNDAY', 'order': 6 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }
    ])

    /**
     * Keeps in place all the days and the meals (Monday to Sunday - Breakfast to dinner)
     * @param updatedPlan the plan we are going to sort
     */
    const sortDaysAnMeals = (updatedPlan: plannedWeek) => {
        updatedPlan.sort((a, b) => a.day.order - b.day.order);
        updatedPlan.forEach((day) => {
            day.mealList.sort((a, b) => a.time.order - b.time.order)
        })
    }

    /**
     * Adds a day to plan
     * @param paramDay the day that we are creating or updating
     * @param paramMeal the meal that we are creating or updating
     * @param newDish the dish that ware adding to the meal
     */
    const addDayToPlan = (paramDay: Day, paramMeal: Meal, newDish: Dish) => {
        const planToUpdate: z.infer<typeof oneWeekSchema> = structuredClone(plan);
        const plannedDay = planToUpdate.find(day => day.day.name === paramDay.name);
        if (plannedDay) {
            addMealToDay(plannedDay, paramMeal, newDish);
        } else {
            planToUpdate.push({ day: paramDay, mealList: [{ time: paramMeal, dishList: [newDish] }] })
        }
        sortDaysAnMeals(planToUpdate);
        setPlanning(planToUpdate);
    }

    /**
     * Adds a meal to a day
     * @param plannedMeals 
     * @param paramMeal 
     * @param newDish 
     */
    const addMealToDay = (plannedMeals: plannedWeek, paramMeal: Meal, newDish: Dish) => {
        const meal = plannedMeals.mealList.find(meal => meal.time.name === paramMeal.name);

        if (meal) { // Esto nunca va a ser true porque no puede comprobar la igualdad
            addDishToMeal(meal, newDish)
            // Si no existe la comida
        } else {
            plannedMeals.mealList.push({ time: paramMeal, dishList: [newDish] })
        }
    }

    /**
     * Adds a new dish to a meal
     * @param meal the meal we are updating with the dish
     * @param newDish the dish we are adding
     * @returns 
     */
    const addDishToMeal = (meal: Meal, newDish: Dish) => {
        const dish = newDish
        meal.dishList.splice(0, 1, dish)
    }

    const saveWeeklyPlan = () => {
        console.log(plan)
    }

    return (
        <div className="gap-4 flex flex-col">
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
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-240q-117 0-198.5-81.5T160-520v-240q0-33 23.5-56.5T240-840h500q58 0 99 41t41 99q0 58-41 99t-99 41h-20v40q0 117-81.5 198.5T440-240ZM240-640h400v-120H240v120Zm200 320q83 0 141.5-58.5T640-520v-40H240v40q0 83 58.5 141.5T440-320Zm280-320h20q25 0 42.5-17.5T800-700q0-25-17.5-42.5T740-760h-20v120ZM160-120v-80h640v80H160Zm280-440Z" />
                    </svg>
                </div>
                <div onClick={() => setMeal({ name: 'BREAKFAST', order: 0 })} className={`p-2 border-[1px] ${meal?.name === 'MIDMORNING' ? 'bg-slate-200' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-120q-117 0-198.5-81.5T200-400q0-94 55.5-168.5T401-669q-20-5-39-14.5T328-708q-33-33-42.5-78.5T281-879q47-5 92.5 4.5T452-832q23 23 33.5 52t13.5 61q13-31 31.5-58.5T572-828q11-11 28-11t28 11q11 11 11 28t-11 28q-22 22-39 48.5T564-667q88 28 142 101.5T760-400q0 117-81.5 198.5T480-120Zm0-80q83 0 141.5-58.5T680-400q0-83-58.5-141.5T480-600q-83 0-141.5 58.5T280-400q0 83 58.5 141.5T480-200Zm0-200Z" />
                    </svg>
                </div>
                <div onClick={() => setMeal({ name: 'BREAKFAST', order: 0 })} className={`p-2 border-[1px] ${meal?.name === 'LUNCH' ? 'bg-slate-200' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M160-120q-33 0-56.5-23.5T80-200v-120h800v120q0 33-23.5 56.5T800-120H160Zm0-120v40h640v-40H160Zm320-180q-36 0-57 20t-77 20q-56 0-76-20t-56-20q-36 0-57 20t-77 20v-80q36 0 57-20t77-20q56 0 76 20t56 20q36 0 57-20t77-20q56 0 77 20t57 20q36 0 56-20t76-20q56 0 79 20t55 20v80q-56 0-75-20t-55-20q-36 0-58 20t-78 20q-56 0-77-20t-57-20ZM80-560v-40q0-115 108.5-177.5T480-840q183 0 291.5 62.5T880-600v40H80Zm400-200q-124 0-207.5 31T166-640h628q-23-58-106.5-89T480-760Zm0 520Zm0-400Z" />
                    </svg>
                </div>
                <div onClick={() => setMeal({ name: 'BREAKFAST', order: 0 })} className={`p-2 border-[1px] ${meal?.name === 'SNACK' ? 'bg-slate-200' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M444-600q-55 0-108 15.5T238-538l42 378h400l44-400h-28q-38 0-69-5.5T542-587q-23-7-48-10t-50-3Zm-216-25q51-27 105.5-41T445-680q30 0 59.5 4t58.5 12q50 14 76.5 19t56.5 5h37l17-160H210l18 175Zm51 545q-31 0-53.5-20T200-151l-80-729h720l-80 729q-3 31-25.5 51T681-80H279Zm165-80h236-400 164Z" />
                    </svg>
                </div>
                <div onClick={() => setMeal({ name: 'BREAKFAST', order: 0 })} className={`p-2 border-[1px] ${meal?.name === 'DINNER' ? 'bg-slate-200' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M400-160h160v-44l50-20q65-26 110.5-72.5T786-400H174q20 57 65 103.5T350-224l50 20v44Zm-80 80v-70q-107-42-173.5-130T80-480h80v-320l720-80v60l-460 52v68h460v60H420v160h460q0 112-66.5 200T640-150v70H320Zm0-620h40v-62l-40 5v57Zm-100 0h40v-50l-40 4v46Zm100 220h40v-160h-40v160Zm-100 0h40v-160h-40v160Zm260 80Z" />
                    </svg>
                </div>
            </div>

            <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona el plato" />
                </SelectTrigger>
                <SelectContent>
                </SelectContent>
            </Select>

            <Button onClick={() => addDayToPlan(day!, meal!, dish!)}>Añadir</Button>

            <div className="flex flex-col overflow-y-scroll gap-6 h-96">
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