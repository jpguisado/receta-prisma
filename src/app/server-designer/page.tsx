import { getWeekDates, getWeekStartDate } from "~/lib/utils";
import { fetchActiveWeekData, fetchDishList } from "~/server/data-layer";
import NewDesignComponent from "./new-design";
import { Suspense } from "react";

export default async function Page(props: {
    searchParams?: Promise<{
        query?: string;
        d?: string;
        m?: string;
        y?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const dishName = searchParams?.query ?? '';
    const dayInParams = searchParams?.d ?? '';
    const monthInParams = searchParams?.m ?? '';
    const yearInParams = searchParams?.y ?? '';
    const checkActiveDate = () => {
        if (dayInParams && monthInParams && yearInParams) {
            const d = parseInt(dayInParams);
            const m = parseInt(monthInParams);
            const y = parseInt(yearInParams);
            const currentDateInParams = new Date(y, m, d);
            const firstDayFromParams = getWeekStartDate(currentDateInParams);
            return firstDayFromParams;
        } else {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();
            const currentDay = new Date().getDate();
            const currentDateInParams = new Date(currentYear, currentMonth, currentDay);
            const firstDayFromServer = getWeekStartDate(currentDateInParams);
            return firstDayFromServer;
        }
    }
    const calculatedFirstDay = checkActiveDate();
    const datesOfCurrentWeek = getWeekDates(calculatedFirstDay);
    const fetchFromServerActiveWeekData = fetchActiveWeekData(datesOfCurrentWeek);
    const dishList = fetchDishList(dishName);
    return (
        <Suspense fallback={'Loading dish component'}>
            <NewDesignComponent
                storedDishList={dishList}
                storedPlannedWeek={fetchFromServerActiveWeekData}
                currentWeek={datesOfCurrentWeek}
            />
        </Suspense>
    )
}