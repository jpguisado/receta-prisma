import { Meal } from "./Meal"

export const DayComponent = ({ day }: { day: string }) => {
    return (
        <>
            {/* Day component */}
            <div className="border-[1px] mb-3 h-20 rounded-md flex justify-between">
                <div className="font-black border-r-[1px] w-10 flex items-center justify-center">{day}</div>

                <div className="flex w-full justify-between overflow-x-scroll gap-1">
                    <Meal meal="breakfast" />
                    <Meal meal="midmorning" />
                    <Meal meal="lunch" />
                    <Meal meal="snack" />
                    <Meal meal="dinner" />
                </div>

                <div className="font-black border-l-[1px] w-10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="24"><path d="M80-240v-480h80v480H80Zm560 0-57-56 144-144H240v-80h487L584-664l56-56 240 240-240 240Z" />
                    </svg>
                </div>
            </div>
        </>
    )
}