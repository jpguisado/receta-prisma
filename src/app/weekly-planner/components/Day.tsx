import { WEEK_DAYS } from "~/lib/utils"
import { MealComponent } from "./Meal"
import type { plannedDay } from "~/models/types/plannedDay.td"
import Link from "next/link"

export const DayComponent = ( comidas: plannedDay) => {
    return (
        <div className="border-[1px] mb-3 h-20 rounded-md flex justify-between">
            <div className="font-black border-r-[1px] w-10 flex items-center justify-center">{WEEK_DAYS[comidas.day.getDay()]}</div>
            <div className="flex w-full justify-between overflow-x-scroll gap-1">
                    {comidas.plannedMeal.map(({id, meal, dish}) => {
                        return <MealComponent key={id} meal={meal} dish={dish} />
                    })}
            </div>
            <Link href={`weekly-planner/${comidas.id}`}>
                <div className="font-black border-l-[1px] w-10 h-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="24"><path d="M80-240v-480h80v480H80Zm560 0-57-56 144-144H240v-80h487L584-664l56-56 240 240-240 240Z" />
                    </svg>
                </div>
            </Link>
        </div>
    )
}