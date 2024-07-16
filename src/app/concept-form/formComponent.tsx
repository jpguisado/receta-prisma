'use client';
import type { comidaPlanificada } from "@prisma/client";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronLeft, ChevronRight, ChevronsUpDown } from "lucide-react"
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { comidaPlanificadaSchema } from "~/models/schemas/comidaPlanificadaSchema";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

import { cn } from "~/lib/utils";
import type { Dish } from "~/models/types/dish.td";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useState } from "react";

export default function FormularioPlanearComida({ dishList }: { dishList: Dish[] }) {

  const [startingDate, setStartingDate] = useState(new Date());
  const meals = ['BREAKFAST', 'MIDMORNING', 'LUNCH','SNACK', 'COMPLEMENTARY', 'DINNER']

  /**
   * Returns the dates of a week starting on a date
   * @param startingDate 
   * @returns 
   */
  const getWeekDates = (startingDate: Date) => {
    const startingDay = startingDate.getDay();
    const startingDayInMilis = startingDate.getTime();
    const week = [];
    for (let index = 0; index < startingDay; index++) {
      week.push(new Date(startingDayInMilis - 86400000 * (startingDay - index - 1)));
    }
    for (let index = startingDay; index < 7; index++) {
      week.push(new Date(startingDayInMilis + (86400000 * (index - startingDay + 1))));
    }
    return week;
  }

  /**
   * 
   * @param e 
   * @param action 
   */
  const setWeek = (e: React.MouseEvent<HTMLButtonElement>, action: string) => {
    e.preventDefault();
    const timeInMilis = action === 'add' ? startingDate.getTime() + (86400000 * 7) : startingDate.getTime() - (86400000 * 7);
    setStartingDate(new Date(timeInMilis));
  }

  /**
   * 
   */
  const form = useForm<comidaPlanificada>({
    resolver: zodResolver(comidaPlanificadaSchema),
    defaultValues: {

    },
  })

  /**
   * 
   * @param values 
   */
  const onSubmit = (values: comidaPlanificada) => {
    console.log(values);
  }

  const printedWeek = getWeekDates(startingDate)

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Selecciona el día</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  className="flex space-y-1"
                >
                  <Button onClick={(e) => setWeek(e, 'remove')} variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {printedWeek.map((day) => {
                    return (
                      <FormItem key={day.getDate()} className="flex flex-col items-center space-x-0 space-y-0 gap-1">
                        <FormControl>
                          <RadioGroupItem value={day.getDate().toString()} className={`${day.getDate() === new Date().getDate() ? 'ring-2 ring-green-500' : ''}`} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {day.getDate()}
                        </FormLabel>
                      </FormItem>
                    )
                  })}
                  <Button onClick={(e) => setWeek(e, 'add')} variant="outline" size="icon">
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
              <FormLabel>Selecciona la comida</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-y-1"
                >
                  {meals.map((meal) => {
                    return (
                      <FormItem key={meal} className="flex flex-col items-center space-x-0 space-y-0 gap-1">
                        <FormControl>
                          <RadioGroupItem value={meal} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {meal}
                        </FormLabel>
                      </FormItem>
                    )
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dishId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Selecciona el plato</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
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
                            value={dish.id.toString()}
                            key={dish.id}
                            onSelect={() => {
                              form.setValue("dishId", dish.id)
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
              <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

  )
}