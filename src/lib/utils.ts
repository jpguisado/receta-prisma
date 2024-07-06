import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getWeekNumber = (dateToCompare: Date) => {
  const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1).getTime();
  const difference = dateToCompare.getTime() - firstDayOfYear;
  return Math.ceil(((difference) / 86400000 + 1) / 7)
}