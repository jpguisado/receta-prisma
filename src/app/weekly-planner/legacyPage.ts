    const [day, setDay] = useState<Day>();
    const [meal, setMeal] = useState<Meal>();
    const [dish, setDish] = useState<Dish>();
    const [plan, setPlanning] = useState<plannedWeek>([
        {
            day: { name: 'MONDAY', 'order': 0 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'TUESDAY', 'order': 1 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'WEDNESDAY', 'order': 2 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'THURSDAY', 'order': 3 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'FRIDAY', 'order': 4 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'SATURDAY', 'order': 5 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }, {
            day: { name: 'SUNDAY', 'order': 6 },
            mealList: [
                {
                    time: {
                        order: 0, name: 'BREAKFAST'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 2, name: 'LUNCH'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
                {
                    time: {
                        order: 3, name: 'DINNER'
                    },
                    dishList: [{ name: '-', ingredients: [] }],
                },
            ],
        }
    ])

    /**
     * Keeps in place all the days and the meals (Monday to Sunday - Breakfast to dinner)
     * @param updatedPlan the plan we are going to sort
     */
    const sortDaysAnMeals = (updatedPlan: plannedWeek) => {
        updatedPlan.sort((a, b) => a.day.order - b.day.order);
        updatedPlan.forEach((day) => {
            day.mealList.sort((a, b) => a.time.order - b.time.order)
        })
    }

    /**
     * Adds a day to plan
     * @param paramDay the day that we are creating or updating
     * @param paramMeal the meal that we are creating or updating
     * @param newDish the dish that ware adding to the meal
     */
    const addDayToPlan = (paramDay: Day, paramMeal: Meal, newDish: Dish) => {
        const planToUpdate: z.infer<typeof oneWeekSchema> = structuredClone(plan);
        const plannedDay = planToUpdate.find(day => day.day.name === paramDay.name);
        if (plannedDay) {
            addMealToDay(plannedDay, paramMeal, newDish);
        } else {
            planToUpdate.push({ day: paramDay, mealList: [{ time: paramMeal, dishList: [newDish] }] })
        }
        sortDaysAnMeals(planToUpdate);
        setPlanning(planToUpdate);
    }

    /**
     * Adds a meal to a day
     * @param plannedMeals 
     * @param paramMeal 
     * @param newDish 
     */
    const addMealToDay = (plannedMeals: plannedWeek, paramMeal: Meal, newDish: Dish) => {
        const meal = plannedMeals.mealList.find(meal => meal.time.name === paramMeal.name);

        if (meal) { // Esto nunca va a ser true porque no puede comprobar la igualdad
            addDishToMeal(meal, newDish)
            // Si no existe la comida
        } else {
            plannedMeals.mealList.push({ time: paramMeal, dishList: [newDish] })
        }
    }

    /**
     * Adds a new dish to a meal
     * @param meal the meal we are updating with the dish
     * @param newDish the dish we are adding
     * @returns 
     */
    const addDishToMeal = (meal: Meal, newDish: Dish) => {
        const dish = newDish
        meal.dishList.splice(0, 1, dish)
    }

    const saveWeeklyPlan = () => {
        console.log(plan)
    }