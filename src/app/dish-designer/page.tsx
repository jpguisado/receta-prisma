import Link from "next/link";
import DishDesignerComponent from "./create-dish-form";
import { connection } from "next/server";

export default async function DishDesigner(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query ?? '';
    await connection();
    return (
        <div>
            <div className="text-2xl font-medium">Crear recetas:</div>
            <div className="mb-4 text-right text-blue-600 font-bold"><Link href={'/dish-list'}>Editar recetas</Link></div>
            <DishDesignerComponent />
        </div>
    )
}