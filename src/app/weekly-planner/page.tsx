import { fetchDishList, fetchPlannedDays } from "~/server/data-layer";
import FormularioPlanearComida from "./formComponent";
import { DayComponent } from "./components/Day";
import { getWeekDates } from "~/lib/utils";
import { Suspense } from "react";

export default async function Formulario({ searchParams }: { searchParams: { dateInMilis?: string, page?: string; }; }) {

    /**
     * Fetch dish list
     */
    const dishList = await fetchDishList();

    /**
     * Gets the date from Search Params or current date
     * @returns calendar starting date
     */
    const getCalendarStartDate = () => 
        searchParams.dateInMilis ? new Date(parseInt(searchParams.dateInMilis, 10)) : new Date();

    /**
     * Gets dates of the referenced week
     */
    const datesOfWeekToBePrinted = getWeekDates(getCalendarStartDate());

    /**
     * Gets planned days of the referenced week
     */
    const plannedDaysOfWeek = await fetchPlannedDays(datesOfWeekToBePrinted);

    // Initiate both requests in parallel
    const [list, days] = await Promise.all([dishList, plannedDaysOfWeek])

    return (
        <>
            <FormularioPlanearComida
                dishList={list}
            />
            <Suspense fallback={<div className="text-2xl text-red-800">...Loading</div>}>
            <div className="overflow-hidden mt-5">
            {days.map(({ id, day, plannedMeal }) => (
                        <DayComponent
                            key={id}
                            id={id}
                            day={day}
                            plannedMeal={plannedMeal}
                        />
                    ))}
            </div>
            </Suspense>
        </>
    )
}