'use client';
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "~/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from "~/components/ui/command";
import { plannedDay } from "~/models/types/plannedDay.td";
import { plannedDaySchema } from "~/models/schemas/plannedDaySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { BrandNewDish } from "~/models/types/dish.td";

export default function EditWeeklyPlan({ dishList }: { dishList: BrandNewDish[] }) {

    const mockedDishList: BrandNewDish[] = [{
        name: 'Tortilla mockeada',
        id: 1,
        recipe: 'Receta rápida',
        ingredients: [{
            ingredient: {
                name: 'Ingrediente virtual',
            },
            quantity: 'q',
            quantityUnit: 'q',
            ingredientId: 1
        }]
    }]

    /**
     * Manages the form for a plannedMeal
     */
    const form = useForm<plannedDay>({
        resolver: zodResolver(plannedDaySchema),
        defaultValues: {
            plannedMeal: [{
                
            }],
            day: undefined,
        }
    })

    return (
        <Form {...form}>

            <FormField
                control={form.control}
                name="plannedMeal"
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
                                        {/* {field.value
                                            ? mockedDishList.find(
                                                (dish) => dish.id === field.value
                                            )?.name
                                            : "Selecciona plato"} */}
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
                                            {/* {dishList.map((dish) => (
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
                                            ))} */}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </Form>

    )
}