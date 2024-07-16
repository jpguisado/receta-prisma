import { date } from "zod";
import UpdateDate from "~/components/url/updateDate";
import { getWeekNumber } from "~/lib/utils";
import { RadioButton } from "../weekly-planner/components/Input/RadioButton";

export default async function Calendar({ searchParams }: { searchParams: { dateInMilis?: string, page?: string; }; }) {

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
     * Prints days of a determined week
     * @returns 
     */
    const printWeeklyCalendar = (weekToBePrinted: Date) => {
        return (
            getWeekDates(weekToBePrinted).map((date) => {
                return <RadioButton key={date.getDate()} value={date} name={date.getDate().toString()}>{date.getDate()}</RadioButton>
            })
        )
    }

    /**
     * Checks if searchParams are defined. If not, returns current date
     * @returns date based on searchParams or current date.
     */
    const weekToBePrinted = () => {
        return searchParams.dateInMilis ? new Date(parseInt(searchParams.dateInMilis, 10)) : new Date();
    }

    return (
        <div className="gap-5 flex flex-col">
            <div className="border-2 w-fit gap-1 flex flex-col">
                <p>Semana: {getWeekNumber(weekToBePrinted())}</p>
                <div className="flex gap-1">
                    <UpdateDate operation="remove" />
                    <form>
                        {printWeeklyCalendar(weekToBePrinted()).map((day) => {
                            return day
                        })}
                        <UpdateDate operation="add" />
                    </form>
                </div>
            </div>
        </div>
    )
}