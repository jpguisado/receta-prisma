'use client';
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { dishSchema } from "~/models/schemas/dishSchema";
import type { Dish } from "~/models/types/dish.td";
import { createDish } from "~/server/actions";

export default function DishDesigner() {
    /**
     * Manages the form for a plannedMeal
     */
    const { control } = useForm<Dish>({
        resolver: zodResolver(dishSchema),
    })
    const form = useForm<Dish>({
        resolver: zodResolver(dishSchema),
        defaultValues: {
            name: '',
        }
    })

    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control,
        name: "ingredientList", // unique name for your Field Array
    });

    const createNewDish = createDish.bind(null);

    /**
     * 
     * @param values 
     */
    async function onSubmit(values: Dish) {
        await createNewDish(values);
        form.reset();
    }
    return (
        <Form {...form}>
            <form autoComplete="off" className="flex flex-col gap-3 h-full" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between gap-3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input className="" placeholder="Dish name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" variant={"default"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                        </svg>
                    </Button>
                </div>
                <div className="overflow-scroll flex flex-col gap-3">
                    {
                        fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-3">
                                <FormField
                                    key={field.id}
                                    control={form.control}
                                    defaultValue={''}
                                    name={`ingredientList.${index}.name`}
                                    render={({ field }) => (
                                        <FormItem className="flex w-full">
                                            <FormControl className="flex">
                                                <Input className="w-full" placeholder="Ingredient name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="flex gap-1" variant={'destructive'} type="button" onClick={() => remove(index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    Borrar
                                </Button>
                            </div>
                        ))
                    }
                </div>
                <Button variant={"secondary"}
                    className="flex gap-1"
                    type="button"
                    onClick={() =>
                        append({
                            name: "",
                            id: 0
                        })
                    }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Añadir ingrediente
                </Button>
            </form>
        </Form>
    );
}