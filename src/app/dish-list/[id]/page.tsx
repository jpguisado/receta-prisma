import Link from "next/link";
import DishDesignerComponent from "~/app/dish-designer/create-dish-form";
import { fetchDishWithId } from "~/server/data-layer";

export default async function EditDish({ params }: { params: { id: string }; }) {

    const dish = await fetchDishWithId(parseInt(params.id))

    return (
        <div>
            <div className="text-2xl font-medium">Editar recetas:</div>
            <div className="mb-4 text-right text-blue-600 font-bold"><Link href={'/dish-list'}>Volver a la lista</Link></div>
            <DishDesignerComponent
                name={dish.name}
                ingredientList={dish.ingredientList}
                recipe={dish.recipe}
            />
        </div>
    )
}