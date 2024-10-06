import { calcularLosDiasDeLaSemana, findFirstDayOfWeek } from "~/lib/utils";
import { fetchIngredients } from "~/server/data-layer"
import GetDays from "./days-query";

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
	
	const todayIngredients = fetchIngredients(datesOfWeekToBePrinted);

	return (
		<div>
			{/* <GetDays startingDate={new Date()} /> */}
			hoy: {findFirstDayOfWeek(getCalendarStartDate()).toString()}
			<br></br>la semana: {(datesOfWeekToBePrinted).map((date)=> <p key={date.getTime()}>{date.toString()}</p>)}
			{(await todayIngredients).map((ingredient) => {
				return ingredient.dish.ingredients.map((ingredient) => {
					return ingredient.ingredient.name
				})
			})}
		</div>
	)
}
