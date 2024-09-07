import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { fetchDishList, fetchMealsOfADay } from "~/server/data-layer";
import EditMealsForm from "./edit-meals-form";
import { plannedMeal } from "~/models/types/plannedMeal.td";

export default async function PlannedDay({ params }: { params: { id: string } }) {

    const meals: plannedMeal[] = await fetchMealsOfADay(parseInt(params.id));
    const dishList = await fetchDishList();

    console.log(dishList)
    
    return (
        <div className="flex flex-col gap-3">
        <span className="text-2xl bold">Comidas del día:</span>
        <EditMealsForm meals={meals} dish={dishList} />
        <Button variant={"default"} className="">Guardar</Button>
        </div>
    )
}