import { fetchDishList, fetchPlannedDays } from "~/server/data-layer";
import FormularioPlanearComida from "./create-plan-form";
import { DayComponent } from "./components/Day";
import { calcularLosDiasDeLaSemana, findFirstDayOfWeek } from "~/lib/utils";

export default async function Formulario({ searchParams }: { searchParams: { dateInMilis?: string, page?: string; }; }) {

    /**
     * Gets the date from Search Params or current date
     * @returns calendar starting date
     */
    const getCalendarStartDate = () => {3
        return searchParams.dateInMilis ? new Date(parseInt(searchParams.dateInMilis, 10)) : new Date();
    }

    const firstDayOfPassedWeek = findFirstDayOfWeek(getCalendarStartDate())

    const datesOfWeekToBePrinted = calcularLosDiasDeLaSemana(firstDayOfPassedWeek);

    // Initiate both requests in parallel
    const [list, days] = await Promise.all([
        fetchDishList(), fetchPlannedDays(datesOfWeekToBePrinted)])

    return (
        <>
            <FormularioPlanearComida
                dishList={list}
                week={datesOfWeekToBePrinted}
            />
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
        </>
    )
}