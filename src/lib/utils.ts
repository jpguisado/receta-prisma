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
 * Returns the dates of a week starting on a date
 * @param startingDate 
 * @returns 
 */
export const getWeekDates = (startingDate: Date) => {
  // Day of the week that starts the calculation
  const startingDay = startingDate.getDay();
  // Date that starts the calculation in milis
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
 * Returns the date of the first day of the week using any date of the evaluated week 
 * @param evaluatedDate any date of the week
 * @returns the date of the first day of the week assuming that's monday 
 */
export const firstDayOfWeek = (evaluatedDate: Date) => {
  const daysElapsed = evaluatedDate.getDay();
  return new Date(evaluatedDate.getTime() - ((daysElapsed - 1) * 86400000));
}