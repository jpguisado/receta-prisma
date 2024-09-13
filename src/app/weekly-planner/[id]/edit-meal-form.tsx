'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "~/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { plannedMealSchema, plannedMealSchemaBulk } from "~/models/schemas/plannedMealSchema";
import type { BrandNewDish } from "~/models/types/dish.td";
import type { plannedMeal } from "~/models/types/plannedMeal.td";

interface Props {
    meals: plannedMeal,
    dishList: BrandNewDish[],
}

export default function EditMealsForm({ meals, dishList }: Props) {

    const form = useForm<z.infer<typeof plannedMealSchema>>({
        resolver: zodResolver(plannedMealSchema),
        defaultValues: meals
    })

    function onSubmit(values: z.infer<typeof plannedMealSchema>) {
        console.log(values)
    }

    return (
        <Form {...form}>
            <form autoComplete="off" className="flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
                <FormLabel>{meals.meal}</FormLabel>
                <div className="flex w-full justify-between gap-3">
                    <FormField
                        control={form.control}
                        name="dish.name"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
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
                                                        (dish) => dish.name === field.value
                                                    )?.name
                                                    : "Select dish"}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search dish..." />
                                            <CommandList>
                                                <CommandEmpty>No dish found.</CommandEmpty>
                                                <CommandGroup>
                                                    {dishList.map((dish) => (
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Guardar</Button>
                </div>
            </form>
        </Form>
    )
}