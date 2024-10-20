import { fetchDishList, fetchMealsOfADay } from "~/server/data-layer";
import EditMealsForm from "./edit-meal-form";
import type { plannedMeal } from "~/models/types/plannedMeal.td";

export default async function PlannedDay(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;

    const meals: plannedMeal[] = await fetchMealsOfADay(parseInt(params.id));
    const dishList = await fetchDishList();

    return (
        <div className="flex flex-col gap-3">
        <span className="text-2xl bold">Comidas del día:</span>
        {meals.map((meal) => <EditMealsForm key={meal.id} meals={meal} dishList={dishList} />)}
        {/* <Button variant={"default"} className="">Guardar</Button> */}
        </div>
    )
}