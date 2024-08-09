'use server';

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
    const getCalendarStartDate = () => {
        return searchParams.dateInMilis ? new Date(parseInt(searchParams.dateInMilis, 10)) : new Date();
    }

    /**
     * Gets dates of the referenced week
     */
    const datesOfWeekToBePrinted = getWeekDates(getCalendarStartDate());

    /**
     * Gets planned days of the referenced week
     */
    const plannedDaysOfWeek = await fetchPlannedDays(datesOfWeekToBePrinted);

    return (
        <>
            <FormularioPlanearComida
                dishList={dishList}
            />
            <div className="overflow-hidden mt-5">
                    {plannedDaysOfWeek.map((day) => {
                        return <DayComponent
                            day={day.day}
                            plannedMeal={day.plannedMeal}
                            key={day.id}
                            id={day.id}
                        />
                    })}
            </div>
        </>
    )
}