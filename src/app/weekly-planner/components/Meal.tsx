import { BreakfastIcon } from "./Icons/BreakfastIcon"
import { DinnerIcon } from "./Icons/DinnerIcon"
import { LunchIcon } from "./Icons/LunchIcon"
import { MidmorningIcon } from "./Icons/MidmorningIcon"
import { SnackIcon } from "./Icons/SnackIcon"

// TODO: Hide scrollbar

export const MealComponent = ({ meal, dish }: { meal: string, dish: string }) => {

    /**
     * Returns an icon based on meal name
     * @returns 
     */
    const ShowIconMeal = ({ meal }: { meal: string }) => {
        if (meal === 'BREAKFAST') {
            return <BreakfastIcon />
        }
        if (meal === 'MIDMORNING') {
            return <MidmorningIcon />
        }
        if (meal === 'LUNCH') {
            return <LunchIcon />
        }
        if (meal === 'SNACK') {
            return <SnackIcon />
        }
        if (meal === 'DINNER') {
            return <DinnerIcon />
        }
    }

    return (
        <div className="flex flex-col justify-center items-center text-center text-sm min-w-20 max-w-20 text-wrap">
            <div className="overflow-hidden items-center w-full flex justify-center h-1/2">
                {ShowIconMeal({ meal: meal })}
            </div>
            <div className="overflow-hidden flex items-start h-1/2">
                <span className="">{dish}</span>
            </div>
        </div>
    )
}