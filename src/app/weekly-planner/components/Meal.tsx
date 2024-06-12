import { BreakfastIcon } from "./Icons/BreakfastIcon"
import { DinnerIcon } from "./Icons/DinnerIcon"
import { LunchIcon } from "./Icons/LunchIcon"
import { MidmorningIcon } from "./Icons/MidmorningIcon"
import { SnackIcon } from "./Icons/SnackIcon"

// TODO: Hide scrollbar

export const Meal = ({ meal }: { meal: string }) => {

    /**
     * Returns an icon based on meal name
     * @returns 
     */
    const ShowIconMeal = ({ meal }: { meal: string }) => {
        if (meal === 'breakfast') {
            return <BreakfastIcon />
        }
        if (meal === 'midmorning') {
            return <MidmorningIcon />
        }
        if (meal === 'lunch') {
            return <LunchIcon />
        }
        if (meal === 'snack') {
            return <SnackIcon />
        }
        if (meal === 'dinner') {
            return <DinnerIcon />
        }
    }

    return (
        <div className="flex flex-col justify-center items-center text-center text-sm min-w-20 max-w-20 text-wrap">
            <div className="overflow-hidden items-center w-full flex justify-center h-1/2">
                {ShowIconMeal({ meal: meal })}
            </div>
            <div className="overflow-hidden flex items-start h-1/2">
                <span className="">{meal}</span>
            </div>
        </div>
    )
}