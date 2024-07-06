import { date } from "zod";
import UpdateDate from "~/components/url/updateDate";
import { getWeekNumber } from "~/lib/utils";

export default async function Calendar({ searchParams }: { searchParams: { query?: string, page?: string; }; }) {

    const weekDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
    const year = 2024;

    const defineFirstWeek = () => {
        const firstDayOfYear = new Date(year, 0, 0);
        return firstDayOfYear.getDay();
    }

    const currentYearLengthInDays = () => {
        const firstDayOfYear = new Date(new Date().getFullYear(), 0, 0).getTime();
        const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31).getTime();
        return (lastDayOfYear - firstDayOfYear) / 86400000;
    }

    console.log('Días del año: ', currentYearLengthInDays())
    console.log('Primer día de la semana del primer mes: ', weekDays[defineFirstWeek()]);
    console.log('Total de días de la semana anteriores: ', defineFirstWeek())
    console.log('Total de días de la semana posteriores: ', 6 - defineFirstWeek())

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const printDaysOfWeek = (fecha: Date) => {
    //     const diasHastaAncla = defineFirstWeek();
    //     const diaAncla = defineFirstWeek();

    //     for (let index = 0; index < diasHastaAncla; index++) {
    //         // OLD METHOD console.log(weekDays[index], new Date(new Date().getTime() - 86400000 * (diasHastaAncla - index)).getDate())
    //         console.log(weekDays[index], new Date(new Date(fecha).getTime() - 86400000 * (diasHastaAncla - index)).getDate())
    //     }

    //     console.log('**', weekDays[diaAncla], new Date(fecha).getDate());

    //     for (let index = diaAncla + 1; index < weekDays.length; index++) {
    //         console.log(weekDays[index], new Date(new Date(fecha).getTime() + 86400000 * (index - diasHastaAncla)).getDate());
    //     }
    // }

    const printWeek = (startingDate: Date) => {
        const todayIs = startingDate.getDay();
        const week = [];
        for (let index = 0; index < todayIs; index++) {
            week.push(new Date(startingDate.getTime() - 86400000 * (todayIs - index - 1)).toLocaleString());
        }
        for (let index = todayIs; index < 7; index++) {
            week.push(new Date(startingDate.getTime() + (86400000 * (index - todayIs + 1))).toLocaleString());
        }
        return week;
    }

    const firstDayOfWeek = (evaluatedDate: Date) => {
        const daysElapsed = evaluatedDate.getDay();
        return new Date(evaluatedDate.getTime() - ((daysElapsed - 1) * 86400000));
    }

    console.log(printWeek(firstDayOfWeek(new Date(20024,6,10))));
    // construye la semana anterior
    // construye la semana posterior
    // for (let index = 1; index <= currentYearLengthInDays(); index++) {
    //     if (index % 7 === 0) {
    //         console.log(index)
    //     }
    // }

    // for (let index = defineFirstWeek(); index < weekDays.length; index++) {
    //     console.log(weekDays[index])
    // }

    const fecha = new Date(2024, 1, 5)
    const query = searchParams?.query ?? getWeekNumber(fecha);
    const currentPage = Number(searchParams?.page) || 1;

    const months = ['jan', 'feb'];
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 41, 42]

    return (
        <div className="gap-5 flex flex-col">
            <div className="border-2 w-fit gap-1 flex flex-col">
                <p>Semana: {getWeekNumber(fecha)}</p>
                query Param: {query} currentPage={currentPage}
                <div className="flex gap-1">
                    <UpdateDate operation="decrecer" />
                    <div className="bg-blue-200 min-w-10 h-10 rounded-full flex items-center justify-center">{new Date(2024, 0, parseInt(query, 10) + 0).getDate()}</div>
                    <div className="bg-blue-200 min-w-10 h-10 rounded-full flex items-center justify-center">{new Date(2024, 0, parseInt(query, 10) + 1).getDate()}</div>
                    <div className="bg-blue-200 min-w-10 h-10 rounded-full flex items-center justify-center">{new Date(2024, 0, parseInt(query, 10) + 2).getDate()}</div>
                    <div className="bg-blue-200 min-w-10 h-10 rounded-full flex items-center justify-center">{new Date(2024, 0, parseInt(query, 10) + 3).getDate()}</div>
                    <div className="bg-blue-200 min-w-10 h-10 rounded-full flex items-center justify-center">{new Date(2024, 0, parseInt(query, 10) + 4).getDate()}</div>
                    <div className="bg-blue-200 min-w-10 h-10 rounded-full flex items-center justify-center">{new Date(2024, 0, parseInt(query, 10) + 5).getDate()}</div>
                    <div className="bg-blue-200 min-w-10 h-10 rounded-full flex items-center justify-center">{new Date(2024, 0, parseInt(query, 10) + 6).getDate()}</div>
                    <UpdateDate operation="crecer" />
                </div>
            </div>
            <div className="flex gap-6">

                {months.map((month) => {
                    return (
                        <div key={month} className="border-2 w-fit grid grid-cols-7 gap-1">
                            {days.map((day) => {
                                return <div key={day} className="bg-blue-200 min-w-10 h-10 rounded-full flex items-center justify-center">{day}</div>
                            })}
                        </div>
                    )

                })}

            </div>
        </div>
    )
}