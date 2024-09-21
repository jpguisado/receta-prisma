import { fetchDishList, fetchPlannedDays } from "~/server/data-layer";
import FormularioPlanearComida from "./formComponent";
import { DayComponent } from "./components/Day";
import { getWeekDates } from "~/lib/utils";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default async function Formulario({ searchParams }: { searchParams: { dateInMilis?: string, page?: string; }; }) {

    /**
     * Gets the date from Search Params or current date
     * @returns calendar starting date
     */
    const getCalendarStartDate = () =>
        searchParams.dateInMilis ? new Date(parseInt(searchParams.dateInMilis, 10)) : new Date();

    const datesOfWeekToBePrinted = getWeekDates(getCalendarStartDate());

    // Initiate both requests in parallel
    const [list, days] = await Promise.all([
        fetchDishList(), fetchPlannedDays(datesOfWeekToBePrinted)])

    return (
        <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full">
                <TabsTrigger className="w-full" value="account">Planificar</TabsTrigger>
                <TabsTrigger className="w-full" value="password">Ver</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
                <FormularioPlanearComida
                    dishList={list}
                />
            </TabsContent>
            <TabsContent value="password">
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
            </TabsContent>
        </Tabs>
    )
}