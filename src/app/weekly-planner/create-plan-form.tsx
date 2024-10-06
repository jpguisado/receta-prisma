'use client';
import { useForm, useFormState } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronLeft, ChevronRight, ChevronsUpDown, Loader2, SaveIcon } from "lucide-react"
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn, MEALS, MONTHS, WEEK_DAYS } from "~/lib/utils";
import type { BrandNewDish } from "~/models/types/dish.td";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Suspense, useState } from "react";
import { createMealsForWeek } from "~/server/actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { createPlannedDay } from "~/models/types/plannedDay.td";
import { createPlannedDaySchema } from "~/models/schemas/plannedDaySchema";

export default function FormularioPlanearComida({ dishList, week }: { dishList: BrandNewDish[], week: Date[] }) {

  const [startingDate, setStartingDate] = useState(new Date());
  const searchParams = useSearchParams();
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { replace } = useRouter();

  /**
   * Sets the starting date to configure the calendar
   * @param e  React mouse event
   * @param action Add or remove action
   */
  const setCalendarStartDate = (e: React.MouseEvent<HTMLButtonElement>, action: string): void => {
    e.preventDefault();
    const timeInMilis = action === 'add' ? startingDate.getTime() + (86400000 * 7) : startingDate.getTime() - (86400000 * 7);
    setStartingDate(new Date(timeInMilis));
    setDateInSearchParams(timeInMilis)
  }
  /**
   * Sets date in Search params
   */
  function setDateInSearchParams(startingDate: number): void {
    const params = new URLSearchParams(searchParams);
    params.set('dateInMilis', startingDate.toString())
    replace(`${pathname}?${params.toString()}`);
  }
  /**
   * Manages the form for a plannedMeal
   */
  const form = useForm<createPlannedDay>({
    resolver: zodResolver(createPlannedDaySchema),
    defaultValues: {
      meal: undefined,
      day: undefined,
      dishId: undefined,
    }
  })

  const { control } = form;

  const { isSubmitting } = useFormState({ control });
  /**
   * Handles the submission of the "comidaPlanificada" (planned meal) form.
   * 
   * This function is called when the user submits the form. It performs the following actions:
   * 1. Creates a new week in the database or storage, using the provided meal plan data.
   * 2. Resets the form to its initial state, clearing the input fields.
   * 
   * @param values - An object of type `comidaPlanificada` containing the meal plan data entered by the user.
   *                 This data includes information about the meals planned for each day of the week.
   * 
   * @async - This function is asynchronous because it awaits the completion of `createNewWeek()`.
   */
  async function onSubmit(values: createPlannedDay) {
    await createNewWeek(values);
    form.reset();
  }

  const createNewWeek = createMealsForWeek.bind(null);
  // const weekToBePrinted = getWeekDates(startingDate);

  return (
    <>
      <div>{week[0]?.getDate()} - {week[6]?.getDate()} {MONTHS[startingDate.getMonth()]}</div>
      {/* <div className="text-2xl font-medium">Semana {getWeekNumber(startingDate)}</div> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="day"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    orientation="horizontal"
                    onValueChange={field.onChange}
                    className="flex justify-between space-y-1 items-center"
                  >
                    <Button onClick={(e) => setCalendarStartDate(e, 'remove')} variant="outline" size="icon">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {week.map((day) => {
                      return (
                        <FormItem key={day.getDate().toString()} className="flex flex-col items-center">
                          <FormLabel className="font-normal">
                            {WEEK_DAYS[day.getDay()]}
                          </FormLabel>
                          <FormControl>
                            <RadioGroupItem {...form.register("day", { valueAsDate: true })} value={day.toString()} className={`${day.getDate() === new Date().getDate() ? 'ring-2 ring-green-500' : ''}`} />
                          </FormControl>
                        </FormItem>
                      )
                    })}
                    <Button onClick={(e) => setCalendarStartDate(e, 'add')} variant="outline" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="meal"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormControl>
                  <RadioGroup
                    orientation="horizontal"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex justify-between"
                  >
                    {MEALS.map((meal) => {
                      return (
                        <FormItem key={meal.label} className="flex flex-col items-center space-x-0 space-y-0 gap-1">
                          <FormLabel className="font-normal">
                            {meal.icon}
                          </FormLabel>
                          <FormControl>
                            <RadioGroupItem value={meal.label} />
                          </FormControl>
                        </FormItem>
                      )
                    })}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Suspense>
            <FormField
              control={form.control}
              name="dishId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? dishList.find(
                              (dish) => dish.id === field.value
                            )?.name
                            : "Selecciona plato"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search dish..." />
                        <CommandList>
                          <CommandEmpty>No hay ningún plato</CommandEmpty>
                          <CommandGroup>
                            {dishList.map((dish) => (
                              <CommandItem
                                value={dish.name}
                                key={dish.id}
                                onSelect={() => {
                                  form.setValue("dishId", dish.id!)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    dish.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {dish.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Suspense>
          <Button aria-disabled={isSubmitting} disabled={isSubmitting} className="w-full flex gap-1" type="submit">
            {!isSubmitting ?
              <>
                <SaveIcon size={18} />
                Guardar
              </>
              :
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando
              </>
            }
          </Button>
        </form>
      </Form>
    </>

  )
}