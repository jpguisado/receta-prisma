import { Card, CardContent } from "~/components/ui/card";
import {
  countDishes,
  countPlannedMeals,
} from "~/server/data-layer";
import { QuickMealsViewer } from "./components/quickMealsViewer";

export default async function HomePage() {

  /**
   * Gets planned days of the referenced week
   */
  const dishesCount = await countDishes();
  const plannedMealCount = await countPlannedMeals();
  return (
    <div className="flex flex-col">
      <div className="mb-5 text-2xl font-medium">¿Qué vamos a comer hoy?</div>
      <QuickMealsViewer />
      <div className="grid grid-cols-2 gap-3">
        <Card className="border-none bg-green-200">
          <CardContent className="p-3">
            <p className="text-sm font-medium text-green-800">
              Number of meals
            </p>
            <p className="text-xl font-bold text-green-900">{12}</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-red-200">
          <CardContent className="p-3">
            <p className="text-sm font-medium text-red-800">
              Planned Meals so far:
            </p>
            <p className="text-xl font-bold text-red-900">{plannedMealCount}</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-yellow-200">
          <CardContent className="p-3">
            <p className="text-sm font-medium text-yellow-800">
              Dishes in database
            </p>
            <p className="text-xl font-bold text-yellow-900">{dishesCount}</p>
          </CardContent>
        </Card>
        <Card className="border-none bg-purple-200">
          <CardContent className="p-3">
            <p className="text-sm font-medium text-purple-800">
              Favorite dishes
            </p>
            <p className="text-xl font-bold text-purple-900">10</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
