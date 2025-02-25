import { ReceiptText } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { fetchTodaysMeals } from "~/server/data-layer";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "~/components/ui/drawer"
import Link from "next/link";
import ActiveWeekControls from "~/components/custom/active-week-controls";

export default async function HomePage(props: {
  searchParams?: Promise<{
    d?: string;
    m?: string;
    y?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const dayInParams = searchParams?.d ?? '';
  const monthInParams = searchParams?.m ?? '';
  const yearInParams = searchParams?.y ?? '';
  const d = parseInt(dayInParams);
  const m = parseInt(monthInParams);
  const y = parseInt(yearInParams);
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
      const currentDateInParams = new Date(currentYear, currentMonth, currentDay);
      return currentDateInParams;
    }
  }
  const currentDate = checkActiveDate();
  const todaysMeals = await fetchTodaysMeals(currentDate);
  return (
    <main className="">
      <h1 className="text-3xl font-bold pt-12 p-6">Hoy comemos:</h1>
      <div className="px-6 flex flex-col gap-3 pb-12">
        <ActiveWeekControls
          isPending={false}
          mode="day"
        />
        {
          todaysMeals?.map((meals => {
            return (
              <Card key={meals.id}>
                <CardHeader>
                  <CardTitle>{meals.meal}</CardTitle>
                  <CardDescription>{meals.dish?.name ? meals.dish?.name : <Link href={'/server-designer'}>Planificar</Link>}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end">
                  {meals.dish?.recipe ? (
                    <Drawer>
                      <DrawerTrigger><ReceiptText /></DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>{meals.dish?.name}</DrawerTitle>
                          <DrawerDescription>{meals.dish?.recipe}</DrawerDescription>
                        </DrawerHeader>
                      </DrawerContent>
                    </Drawer>
                  ) : ''}
                </CardFooter>
              </Card>
            )
          }))
        }
      </div>
    </main>
  );
}
