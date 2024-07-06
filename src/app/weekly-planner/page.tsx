import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { BreakfastIcon } from "./components/Icons/BreakfastIcon";
import { DayComponent } from "./components/Day";
import { RadioButton } from "./components/Input/RadioButton";
import { fetchDishList, fetchPlannedDays } from "~/server/data-layer";
import { MidmorningIcon } from "./components/Icons/MidmorningIcon";
import { DinnerIcon } from "./components/Icons/DinnerIcon";
import { LunchIcon } from "./components/Icons/LunchIcon";
import { SnackIcon } from "./components/Icons/SnackIcon";
import { createMealsForWeek } from "~/server/actions";

export default async function WeeklyPlanner() {

    const dishList = await fetchDishList()
    const mealsOfWeek = await fetchPlannedDays()
    const createNewWeek = createMealsForWeek.bind(null)

    const fechas = new Date();

    console.log('Fecha en el servidor: ', fechas.getDate())

    return (
        <div className="h-full overflow-hidden">
            <div className="h-[45%] gap-3 flex flex-col">
                <div className="text-2xl font-medium">Semana 56</div>
                <form action={createNewWeek}  className="flex flex-col gap-3">
                    <div className="flex gap-3 justify-around">
                        <RadioButton value={new Date()} name={'day'}>M</RadioButton>
                        <RadioButton value={'TUESDAY'} name={'day'}>T</RadioButton>
                        <RadioButton value={'WEDNESDAY'} name={'day'}>W</RadioButton>
                        <RadioButton value={'THURSDAY'} name={'day'}>T</RadioButton>
                        <RadioButton value={'FRIDAY'} name={'day'}>F</RadioButton>
                        <RadioButton value={'SATURDAY'} name={'day'}>S</RadioButton>
                        <RadioButton value={'SUNDAY'} name={'day'}>D</RadioButton>
                    </div>
                    <div className="flex gap-3 justify-around">
                        <RadioButton value={'BREAKFAST'} name={'meal'}><BreakfastIcon /></RadioButton>
                        <RadioButton value={'MIDMORNING'} name={'meal'}><MidmorningIcon /></RadioButton>
                        <RadioButton value={'LUNCH'} name={'meal'}><LunchIcon /></RadioButton>
                        <RadioButton value={'SNACK'} name={'meal'}><SnackIcon /></RadioButton>
                        <RadioButton value={'DINNER'} name={'meal'}><DinnerIcon /></RadioButton>
                    </div>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona el plato" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {
                                    (dishList).map((dish) => {
                                        return <SelectItem key={dish.id} value={dish.id.toString()}>{dish.name}</SelectItem>
                                    })
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button type="submit" className="w-full">Añadir</Button>
                </form>
            </div>
            <div className="h-[55%] overflow-scroll">
                {mealsOfWeek.map((day) => {
                    return (
                        <DayComponent
                            key={day.id}
                            day={day.day}
                            plannedMeal={day.plannedMeal}
                        />
                    )
                })}
            </div>
        </div>
    )
}