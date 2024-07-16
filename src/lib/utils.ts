import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


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
 * Returns the date of the first day of the week using any date of the evaluated week 
 * @param evaluatedDate any date of the week
 * @returns the date of the first day of the week assuming that's monday 
 */
const firstDayOfWeek = (evaluatedDate: Date) => {
  const daysElapsed = evaluatedDate.getDay();
  return new Date(evaluatedDate.getTime() - ((daysElapsed - 1) * 86400000));
}