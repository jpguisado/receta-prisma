import Link from "next/link";
import DishDesignerComponent from "~/app/dish-designer/create-dish-form";
import { fetchDishWithId } from "~/server/data-layer";

export default async function EditDish(props: { params: Promise<{ id: string }>; }) {
    const params = await props.params;

    const dish = await fetchDishWithId(parseInt(params.id))

    console.log(dish)

    return (
        <div>
            <div className="text-2xl font-medium">Editar recetas:</div>
            <div className="mb-4 text-right text-blue-600 font-bold"><Link href={'/dish-list'}>Volver a la lista</Link></div>
            <DishDesignerComponent
                name={dish.name}
                ingredients={dish.ingredients}
                recipe={dish.recipe}
                id={dish.id}
            />
        </div>
    )
}