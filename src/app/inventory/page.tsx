import { calcularLosDiasDeLaSemana, findFirstDayOfWeek } from "~/lib/utils";
import { fetchIngredientsOnDishes } from "~/server/data-layer"
import ManageInventoryForm from "./manage-inventory-form";

export default async function Inventory({ searchParams }: { searchParams: { dateInMilis?: string, page?: string; }; }) {

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

	return (
		<div>
			<div className="text-2xl font-medium">Ingredientes necesarios:</div>
			<ManageInventoryForm
				ingredientsOfTheWeek={todayIngredients}
			/>
		</div>
	)
}
