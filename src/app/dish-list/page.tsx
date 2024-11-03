import { fetchDishList } from "~/server/data-layer";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import Link from "next/link";
import Search from "~/components/url/search";


export default async function ViewDishList(props: {
    searchParams?: Promise<{
      query?: string;
      page?: string;
    }>;
  }) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query ?? '';
    const currentPage = Number(searchParams?.page) || 1;

    const dishList = await fetchDishList(query);

    return (
        <div className="overflow-y-scroll h-[90%]">
            <div className="text-2xl font-medium">Lista de recetas:</div>
            <div className="mb-4 text-right text-blue-600 font-bold"><Link href={'/dish-designer'}>Volver</Link></div>
            <Search placeholder="Search invoices..." />
            <DataTable columns={columns} data={dishList} />
        </div>
    )
}