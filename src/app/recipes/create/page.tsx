import { fetchDishById } from "~/server/dish";
import DishForm from "../dish-form";

export default function Page() {
    const dishListPromise = fetchDishById(2);
    return (
        <DishForm dishPromise={dishListPromise}/>
    )
}