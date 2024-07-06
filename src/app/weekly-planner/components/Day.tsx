import type { Dish } from "~/models/types/dish.td"
import type { Meal } from "~/models/types/meal.td"
import { MealComponent } from "./Meal"

export const DayComponent = ({ day, plannedMeal}: { day: Date, plannedMeal: {id: number, meal: Meal, dish: Dish}[] }) => {

    function getDayOfTheWeek (): string {
        const dayNumber: number = new Date (day).getDay()
        const daysOfTheWeek: string[] = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
        return daysOfTheWeek[dayNumber]!
    }

    return (
        <>
            {/* Day component */}
            <div className="border-[1px] mb-3 h-20 rounded-md flex justify-between">
                <div className="font-black border-r-[1px] w-10 flex items-center justify-center">{getDayOfTheWeek().charAt(0)}</div>
                <div className="flex w-full justify-between overflow-x-scroll gap-1">
                    {plannedMeal.flatMap((meal) => {
                        return <MealComponent key={meal.id} dish={meal.dish.name} meal={meal.meal} />
                    })}
                </div>

                <div className="font-black border-l-[1px] w-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="24"><path d="M80-240v-480h80v480H80Zm560 0-57-56 144-144H240v-80h487L584-664l56-56 240 240-240 240Z" />
                    </svg>
                </div>
            </div>
        </>
    )
}