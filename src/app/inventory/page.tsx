import { calcularLosDiasDeLaSemana, findFirstDayOfWeek } from "~/lib/utils";
import { fetchIngredientsOnDishes } from "~/server/data-layer"
import ManageInventoryForm from "./manage-inventory-form";

export default async function Inventory(
    props: { searchParams: Promise<{ dateInMilis?: string, page?: string; }>; }
) {
    const searchParams = await props.searchParams;

    /**
 * Gets the date from Search Params or current date
 * @returns calendar starting date
 */
    const getCalendarStartDate = () => {
		return searchParams.dateInMilis ? new Date(parseInt(searchParams.dateInMilis, 10)) : new Date();
	}

    const firstDayOfPassedWeek = findFirstDayOfWeek(getCalendarStartDate())

    const datesOfWeekToBePrinted = calcularLosDiasDeLaSemana(firstDayOfPassedWeek);

    const todayIngredients = await fetchIngredientsOnDishes(datesOfWeekToBePrinted);

    const shoppingListItemsDos = {
        items: todayIngredients // Simplemente envolvemos el array en la clave "item"
    };

    return (
		<div>
			<div className="text-2xl font-medium">Ingredientes necesarios:</div>
			<ManageInventoryForm
				itemsForThisWeek={shoppingListItemsDos}
			/>
		</div>
	)
}
