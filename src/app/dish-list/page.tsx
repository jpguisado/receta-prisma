import { fetchDishList } from "~/server/data-layer";
import { DataTable } from "./data-table";
import { columns } from "./columns";


export default async function ViewDishList() {

    const dishList = await fetchDishList();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={dishList} />
        </div>
    )
}