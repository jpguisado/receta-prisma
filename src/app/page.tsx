import { Suspense } from "react";
import ActiveWeekControls from "~/components/custom/active-week-controls";
import { MONTHS } from "~/lib/utils";
import { fetchTodaysMeals } from "~/server/data-layer";
import MealsResume from "./meals-resume";

export default async function HomePage(props: {
  searchParams?: Promise<{
    d?: string;
    m?: string;
    y?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const dayInParams = searchParams?.d ?? "";
  const monthInParams = searchParams?.m ?? "";
  const yearInParams = searchParams?.y ?? "";
  const checkActiveDate = () => {
    if (dayInParams && monthInParams && yearInParams) {
      const d = parseInt(dayInParams);
      const m = parseInt(monthInParams);
      const y = parseInt(yearInParams);
      const currentDateInParams = new Date(y, m, d);
      return currentDateInParams;
    } else {
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      const currentDay = new Date().getDate();
      const currentDateInParams = new Date(
        currentYear,
        currentMonth,
        currentDay,
      );
      return currentDateInParams;
    }
  };
  const currentDate = checkActiveDate();
  const todaysMeals = fetchTodaysMeals(currentDate);
  return (
    <main className="">
      <h1 className="p-6 pt-12 text-3xl font-bold">
        Hoy es día {currentDate.getDate()} de{" "}
        {MONTHS[currentDate.getMonth()]?.label}
      </h1>
      <div className="flex flex-col gap-3 px-6 pb-12">
        <ActiveWeekControls isPending={false} mode="day" />
        <Suspense fallback={"Cargando las comidas de hoy"}>
          <MealsResume todaysMeals={todaysMeals} />
        </Suspense>
      </div>
    </main>
  );
}
