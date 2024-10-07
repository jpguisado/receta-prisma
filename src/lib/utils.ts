import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { BreakfastIcon } from "~/app/weekly-planner/components/Icons/BreakfastIcon"
import { DinnerIcon } from "~/app/weekly-planner/components/Icons/DinnerIcon";
import { LunchIcon } from "~/app/weekly-planner/components/Icons/LunchIcon";
import { MidmorningIcon } from "~/app/weekly-planner/components/Icons/MidmorningIcon";
import { SnackIcon } from "~/app/weekly-planner/components/Icons/SnackIcon";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const MEALS = [
  {
    label: 'BREAKFAST',
    icon: BreakfastIcon()
  },{
    label: 'MIDMORNING',
    icon: MidmorningIcon(),
  },{
    label: 'LUNCH',
    icon: LunchIcon(),
  }, {
    label: 'SNACK',
    icon: SnackIcon(), 
  },{
    label: 'DINNER',
    icon: DinnerIcon()
  }
];
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const WEEK_DAYS = ['DO', 'LU', 'MA', 'MI', 'JU','VI','SA'];

/**
 * Gets the number of a week given a date
 * @param dateToCompare the date whose week we want to know
 * @returns The number of a week
 */
export const getWeekNumber = (dateToCompare: Date) => {
  const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
  const difference = dateToCompare.getTime() - firstDayOfYear;
  return Math.ceil(((difference) / 86400000 + 1) / 7)
}

/**
 * Given a date, returns the date of sunday or monday
 * @param dateWhereToSearch date that starts the search
 * @param firstDayOfWeek 0 (sunday) or 1 (monday)
 * @returns First day date
 */
export const findFirstDayOfWeek = (dateWhereToSearch: Date): Date => {
  const twentyFourHoursInMilis = 86400000;
  const dayNumber = ((dateWhereToSearch.getDay() + 6) % 7);
  const daysSinceDayOneInMilis = (dayNumber * twentyFourHoursInMilis);
  const firstDay = new Date(dateWhereToSearch.getTime() - daysSinceDayOneInMilis);
  return firstDay;
}

/**
* Given a date, it returns the next six following dates
* @param firstDayOfWeek It can be 0 or 1 representing sunday or monday
* @param firstDateOfWeek It will be the date of the first day of week
* @returns Array of dates that represents the current week
*/
export const calcularLosDiasDeLaSemana = (firstDateOfWeek: Date) : Date[] => {
  const twentyFourHoursInMilis = 86400000;
  const weekDates: Date[] = []; // Array donde almacenaremos las fechas
  for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      const dayInMilis = firstDateOfWeek.getTime() + twentyFourHoursInMilis * dayOfWeek;
      const dateToAdd = new Date(dayInMilis);
      weekDates.push(dateToAdd);
  }
  return weekDates;
}