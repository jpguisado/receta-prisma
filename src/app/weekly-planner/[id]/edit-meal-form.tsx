'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { plannedMealSchema } from "~/models/schemas/plannedMealSchema";
import { BrandNewDish } from "~/models/types/dish.td";
import { mealsOfWeek } from "~/models/types/mealsOfDay.td";
import { plannedMeal } from "~/models/types/plannedMeal.td";

interface Props {
    meals: plannedMeal[],
    dish: BrandNewDish[]
}

export default function EditMealsForm({meals, dish}: Props) {

    const form = useForm<z.infer<typeof plannedMealSchema>>({
        resolver: zodResolver(plannedMealSchema),
        defaultValues: {
            
        },
    })

    function onSubmit(values: z.infer<typeof plannedMealSchema>) {
        
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {meals.map((meal) => {
                    return (
                        <FormField
                            key={meal.id}
                            control={form.control}
                            name="dish.name"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>{meal.meal}</FormLabel>
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
                                                        ? dish.find(
                                                            (dish) => dish.name === field.value
                                                        )?.name
                                                        : "Select dish"}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[200px] p-0">
                                            <Command>
                                                <CommandInput placeholder="Search language..." />
                                                <CommandList>
                                                    <CommandEmpty>No dish found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {dish.map((dish) => (
                                                            <CommandItem
                                                                value={dish.name}
                                                                key={dish.id}
                                                                onSelect={() => {
                                                                    form.setValue("dish.name", dish.name)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        dish.name === field.value
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
                    )

                })}
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}