import Link from "next/link";
import DishDesignerComponent from "./create-dish-form";

export default async function DishDesigner() {
    return (
        <div>
            <div className="text-2xl font-medium">Crear recetas:</div>
            <div className="mb-4 text-right text-blue-600 font-bold"><Link href={'/dish-list'}>Editar recetas</Link></div>
            <DishDesignerComponent />
        </div>
    )
}