import { fetchDishList } from "~/server/data-layer";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Link from "next/link";


export default async function ViewDishList() {

    const dishList = await fetchDishList();

    return (
        <div className="overflow-y-scroll h-[90%]">
            <div className="text-2xl font-medium">Lista de recetas:</div>
            <div className="mb-4 text-right text-blue-600 font-bold"><Link href={'/dish-designer'}>Volver</Link></div>
            <DataTable columns={columns} data={dishList} />
        </div>
    )
}