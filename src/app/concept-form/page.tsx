'use server';

import { fetchDishList } from "~/server/data-layer";
import FormularioPlanearComida from "./formComponent";
import { ComboboxForm } from "./combobox";

export default async function Formulario({ searchParams }: { searchParams: { dateInMilis?: string, page?: string; }; }) {
    
    const dishList = await fetchDishList();

    console.log(dishList)

    return (
        <FormularioPlanearComida
        dishList={dishList}
        />
    )
}