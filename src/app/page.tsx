import { Card, CardContent } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { countDishes, countPlannedMeals, fetchTodaysDish } from "~/server/data-layer";

export default async function HomePage() {

  /**
   * Gets planned days of the referenced week
   */
  const todaysMeals = await fetchTodaysDish();

  const dishesCount = await countDishes();
  const plannedMealCount = await countPlannedMeals();
  return (
    <div className="flex flex-col">
      <div className="text-2xl font-medium mb-5">¿Qué vamos a comer hoy?</div>
      <Tabs defaultValue={todaysMeals[0]?.meal} className="mb-8">
        <TabsList className="grid w-full grid-cols-5">
          {todaysMeals.map((meal) => (
            <TabsTrigger key={meal.meal} value={meal.meal} className="flex flex-col items-center">
              {/* <div className="w-6 h-6 mb-1">{meal.icon}</div> */}
              <span className="text-xs">{meal.meal.toLowerCase()}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {todaysMeals.map((meal) => (
          <TabsContent key={meal.meal} value={meal.meal}>
            <Card className="bg-gradient-to-r from-primary/20 to-primary/5 border-none">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {/* <meal.icon className="w-10 h-10 text-primary mr-4" /> */}
                  <div>
                    <h2 className="text-lg font-semibold">{meal.meal}</h2>
                    <p key={meal.dish.id} className="text-2xl font-bold">{meal.dish.name}</p>
                    <p className="text-muted-foreground">{meal.dish.recipe}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-green-200 border-none">
          <CardContent className="p-3">
            <p className="text-green-800 text-sm font-medium">Number of meals</p>
            <p className="text-xl font-bold text-green-900">{12}</p>
          </CardContent>
        </Card>
        <Card className="bg-red-200 border-none">
          <CardContent className="p-3">
            <p className="text-red-800 text-sm font-medium">Planned Meals so far:</p>
            <p className="text-xl font-bold text-red-900">{plannedMealCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-yellow-200 border-none">
          <CardContent className="p-3">
            <p className="text-yellow-800 text-sm font-medium">Dishes in database</p>
            <p className="text-xl font-bold text-yellow-900">{dishesCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-200 border-none">
          <CardContent className="p-3">
            <p className="text-purple-800 text-sm font-medium">Favorite dishes</p>
            <p className="text-xl font-bold text-purple-900">10</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
