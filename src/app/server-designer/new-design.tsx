'use client';

import type { DishListType, DishType } from "~/models/types/dish.type";
import type { PlannedWeekType } from "~/models/types/plannedDay";

import { AppleIcon } from "lucide-react";
import { use, useState, useTransition } from "react";
import { Input } from "~/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MEALS } from "~/lib/utils";
import { updateMealOfDay } from "~/server/plannedWeek";
import TableSkeleton from "~/components/custom/table-skeleton";
import ActiveControls from "~/components/custom/active-week-controls";
export const dynamic = 'force-dynamic';
const NewDesignComponent = (
    { storedDishList, storedPlannedWeek, currentWeek }: {
        storedPlannedWeek: Promise<PlannedWeekType>,
        currentWeek: Date[]
        storedDishList: Promise<DishListType>,
    }
) => {
    const router = useRouter();
    const params = useSearchParams();
    const pathname = usePathname();
    const week = use(storedPlannedWeek);
    const dishList = use(storedDishList);
    const [isHovering, setIsHovering] = useState<{ x: number, y: number } | null>();
    const [isPending, startTransition] = useTransition();
    const [fromCoordinates, setFromCoordinates] = useState<{ dayIndex: number, mealIndex: number }>();
    const [draggedValue, setDraggedValue] = useState<DishType>({
        name: '-',
        id: 1,
        recipe: '',
        ingredientList: []
    });
    async function updateCurrentMeal() {
        const mealId = week[fromCoordinates!.dayIndex]!.plannedMeal[fromCoordinates!.mealIndex]?.id;
        await updateMealOfDay(1, mealId!)
    }
    async function updateTargetMeal(targetMealId: number, targetDishId: number) {
        if (fromCoordinates) {
            await updateCurrentMeal()
        }
        startTransition(async () => {
            await updateMealOfDay(targetDishId, targetMealId);
        })
    }
    const filterListOfDishes = (dishName: string) => {
        const searchParams = new URLSearchParams(params);
        if (dishName) {
            searchParams.set('query', dishName);
        } else {
            searchParams.delete('query');
        }
        router.replace(`${pathname}?${searchParams.toString()}`);
    }
    return (
        <div className="flex gap-6 h-full">
            <div className="col-span-3 flex flex-col gap-1">
                <Select>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Categorías</SelectLabel>
                            <SelectItem value="desayuno">Desayuno</SelectItem>
                            <SelectItem value="media mañana">Media mañana</SelectItem>
                            <SelectItem value="almuerzo">Almuerzo</SelectItem>
                            <SelectItem value="merienda">Merienda</SelectItem>
                            <SelectItem value="cena">Cena</SelectItem>
                            <SelectItem value="snack">Snack</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Input
                    placeholder="Introduce texto para filtrar los platos:"
                    onChange={(e) => {
                        filterListOfDishes(e.target.value);
                    }}
                    defaultValue={params.get('dishName')?.toString()}
                />
                <div className="border-[1px] rounded-[2px] px-4 py-2 text-sm font-medium flex flex-col gap-3 h-full overflow-x-scroll">
                    <div>Dishes:</div>
                        {dishList?.map((dish) => {
                            return <div
                                className="hover:bg-slate-50 border-[1px] bg-white rounded-[2px] p-3 flex gap-2 items-center"
                                key={dish.id}
                                draggable
                                onDragStart={() => setDraggedValue(dish)}>
                                <AppleIcon />
                                {dish.name}
                            </div>
                        })}
                </div>
            </div>
            <div className="col-span-9 gap-3 flex flex-col h-full w-full">
                <div className="grid grid-cols-[200px_,_repeat(7,minmax(0,_1fr))] gap-x-3 gap-y-1 text-center h-full grid-rows-[3rem]">
                    {/* Days of the week */}
                    <ActiveControls
                        mode="week"
                        isPending={isPending}
                    />
                    {currentWeek.map((day) =>
                        <div key={day.getDay()} className="h-12 items-center flex justify-center text-sm font-medium border-[1px] bg-slate-100 rounded-[4px]">{day.getDate().toString()}</div>
                    )}
                    <div className="grid gap-1 h-full">
                        {MEALS.map((meal) =>
                            <div key={meal} className="h-full items-center flex justify-center text-xs font-medium border-[1px] bg-slate-100 rounded-[4px]">{meal}</div>
                        )}
                    </div>
                    {week.map((day, dayIndex) => {
                        return (
                            <div key={day.id} className="grid gap-1 h-full items-center">
                                {day.plannedMeal.map((mealsOfADay, mealIndex) => {
                                    return (
                                        <div key={mealsOfADay.id}
                                            draggable
                                            onDragStart={
                                                () => {
                                                    setFromCoordinates({ dayIndex, mealIndex });
                                                    setDraggedValue(mealsOfADay.dish!);
                                                }
                                            }
                                            onDragOver={(event) => {
                                                event.stopPropagation();
                                                event.preventDefault();
                                                setIsHovering({ x: dayIndex, y: mealIndex });
                                            }}
                                            onDragLeave={() => { setIsHovering(null) }}
                                            onDrop={() => {
                                                setIsHovering(null);
                                                void updateTargetMeal(mealsOfADay.id!, draggedValue.id!);
                                            }}
                                            className={`
                                                h-16 
                                                items-center
                                                flex 
                                                justify-center
                                                text-sm
                                                font-medium
                                                transition-all
                                                duration-200
                                                ${isHovering?.x === dayIndex && isHovering.y === mealIndex ?
                                                    'border-slate-700 border-dashed border-2 rounded-[4px]' :
                                                    ''}`
                                            }>
                                            {isPending ? <TableSkeleton /> : <div className="">{mealsOfADay.dish?.name ?? '-'}</div>}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default NewDesignComponent