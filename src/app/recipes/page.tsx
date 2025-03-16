import { Suspense } from "react";
import UpdateQueryParams from "~/components/custom/update-query-params";
import { Skeleton } from "~/components/ui/skeleton";
import { fetchDishList } from "~/server/data-layer";
import DishList from "./dish-list";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const dishName = searchParams?.query ?? "";
  const dishList = fetchDishList(dishName);
  const skeleton = () => {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  };
  return (
    <div className="w-full">
      <UpdateQueryParams param="query" placeholder="Busca el plato" />
      <Suspense fallback={skeleton()}>
        <DishList dishList={dishList} />
      </Suspense>
    </div>
  );
}
