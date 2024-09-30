'use client';

import { date } from "zod";

export default function GetDays({ startingDate }: { startingDate: Date }) {
    const startingDay = startingDate.getDay();
    const startingDayInMilis = startingDate.getTime();
    const week = [];
    for (let index = 0; index < startingDay; index++) {
        week.push(new Date(startingDayInMilis - 86400000 * (startingDay - index - 1)));
    }
    for (let index = startingDay; index < 7; index++) {
        week.push(new Date(startingDayInMilis + (86400000 * (index - startingDay + 1))));
    }

    const date = new Date(2024,9,9, 22, 22);

    const findFirst = findFirstDayOfWeek(date,1);
    const weekDays = calcularLosDiasDeLaSemana(findFirst);

    console.log(weekDays)

    return (
        <div>{date.toString()}</div>
    )
}

/**
 * Given a date, returns the date of sunday or monday
 * @param dateWhereToSearch date that starts the search
 * @param firstDayOfWeek 0 (sunday) or 1 (monday)
 * @returns First day date
 */
const findFirstDayOfWeek = (dateWhereToSearch: Date, firstDayOfWeek: number): Date => {
    const twentyFourHoursInMilis = 86400000;
    const dayNumber = dateWhereToSearch.getDay();
    const IsSundayDayZero = twentyFourHoursInMilis * firstDayOfWeek;
    const daysSinceDayOneInMilis = (dayNumber * twentyFourHoursInMilis);
    const firstDay = new Date((dateWhereToSearch.getTime() - daysSinceDayOneInMilis + IsSundayDayZero));
    return firstDay;
}

/**
 * Given a date, it returns the next six following dates
 * @param firstDayOfWeek It can be 0 or 1 representing sunday or monday
 * @param firstDateOfWeek It will be the date of the first day of week
 * @returns Array of dates that represents the current week
 */
const calcularLosDiasDeLaSemana = (firstDateOfWeek: Date) : Date[] => {
    const twentyFourHoursInMilis = 86400000;
    const weekDates: Date[] = []; // Array donde almacenaremos las fechas
    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const dayInMilis = firstDateOfWeek.getTime() + twentyFourHoursInMilis * dayOfWeek;
        const dateToAdd = new Date(dayInMilis);
        weekDates.push(dateToAdd);
    }
    return weekDates;
}