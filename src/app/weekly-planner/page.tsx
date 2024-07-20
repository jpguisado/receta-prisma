import { Button } from "~/components/ui/button";
import { DayComponent } from "./components/Day";
import { fetchDishList, fetchPlannedDays } from "~/server/data-layer";
import { createMealsForWeek } from "~/server/actions";
import UpdateDate from "~/components/url/updateDate";
import { getWeekNumber } from "~/lib/utils";

export default async function WeeklyPlanner({ searchParams }: { searchParams: { dateInMilis?: string, page?: string; }; }) {

    const dishList = await fetchDishList()
    const mealsOfWeek = await fetchPlannedDays()
    const createNewWeek = createMealsForWeek.bind(null)

    /**
     * Returns the dates of a week starting on a date
     * @param startingDate 
     * @returns 
     */
    const getWeekDates = (startingDate: Date) => {
        const startingDay = startingDate.getDay();
        const startingDayInMilis = startingDate.getTime();
        const week = [];
        for (let index = 0; index < startingDay; index++) {
            week.push(new Date(startingDayInMilis - 86400000 * (startingDay - index - 1)));
        }
        for (let index = startingDay; index < 7; index++) {
            week.push(new Date(startingDayInMilis + (86400000 * (index - startingDay + 1))));
        }
        return week;
    }

    /**
     * 
     * @returns 
     */
    const weekToBePrinted = () => {
        return searchParams.dateInMilis ? new Date(parseInt(searchParams.dateInMilis, 10)) : new Date();
    }

    return (
        <div className="h-full overflow-hidden">
            <div className="h-[45%] gap-3 flex flex-col">
                <div className="text-2xl font-medium">Semana {getWeekNumber(weekToBePrinted())}</div>
                <form action={createNewWeek} className="flex flex-col gap-3">
                    <div className="flex gap-3 justify-around">
                        <UpdateDate operation="remove" />
                        <div className="flex w-full justify-between">
                            {getWeekDates(weekToBePrinted()).map((date) => {
                                return (
                                    <div className="text-md flex flex-col justify-center items-center relative" key={date.getDate() + date.getMonth()}>
                                        <input className="appearance-none checked:bg-slate-500 flex border active:bg-slate-600 hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 md:h-12 md:w-12 justify-center items-center" type="radio" id={date.getMilliseconds().toString()} name='date' value={date.toDateString()} />
                                        <label className="absolute pointer-events-none font-bold z-99" htmlFor={date.getMilliseconds().toString()}>{date.getDate()}</label>
                                    </div>
                                )
                            })}
                        </div>
                        <UpdateDate operation="add" />
                    </div>
                    <div className="flex gap-3 justify-around">
                        <div className="text-md flex flex-col justify-center items-center relative">
                            <input className="appearance-none checked:bg-slate-500 flex border active:bg-slate-600 hover:bg-slate-300 transition-colors duration-200 rounded-full h-8 w-8 md:h-12 md:w-12 justify-center items-center" type="radio" id="meal" name="meal" value='BREAKFAST' />
                            <label className="absolute pointer-events-none font-bold z-99" htmlFor="meal">BREAKFAST</label>
                        </div>
                    </div>
                    <select className="w-full h-10" name="dish">
                        {
                            (dishList).map((dish) => {
                                { console.log(dish) }
                                return <option className="bg-white" key={dish.id} value={dish.name}>{dish.name}</option>
                            })
                        }
                    </select>
                    <Button type="submit" className="w-full">Añadir</Button>
                </form>
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