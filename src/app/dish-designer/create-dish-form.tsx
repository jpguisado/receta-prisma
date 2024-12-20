'use client';
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useFieldArray, useForm, useFormState } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { brandNewDishSchema } from "~/models/schemas/dishSchema";
import type { BrandNewDish } from "~/models/types/dish.td";
import { createDish, deleteIngredientFromDish, editDish } from "~/server/actions";
import { toast } from "~/components/ui/use-toast";
import { useState } from "react";
import { Loader2, SaveIcon } from "lucide-react";
export default function DishDesignerComponent({ name, recipe, ingredients, id }: Partial<BrandNewDish>) {
    const [arrayFieldIndex, setArrayFieldIndex] = useState(0);

    const measureUnits = [
        "unidad", "pizca", "chorrito", "rama", "diente",
        "litro", "mililitro", "centímetro cúbico",
        "kilogramo", "gramo",
        "taza", "cucharada", "cucharadita",
        "libra", "onza",
    ];

    /**
     * Manages the form for a plannedMeal
     */
    const form = useForm<BrandNewDish>({
        resolver: zodResolver(brandNewDishSchema),
        defaultValues: {
            name: name ?? '',
            recipe: recipe ?? '',
            kcal: '',
            ingredients: ingredients ?? [],
            id: id ?? undefined
        },
    });

    const { control } = form;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients",
    });
    const { isSubmitting } = useFormState({ control });

    const createNewDish = createDish.bind(null);
    const editExistingDish = editDish.bind(null);
    const deleteIngredient = deleteIngredientFromDish.bind(null)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function deleteIngredientFromDB(id: number, ingredientId: number, index: number) {
        console.log(id, ingredientId, index)
        id ? await deleteIngredient(id, ingredientId) : '';
        remove(index);
        setArrayFieldIndex(arrayFieldIndex - 1);
    }

    /**
     *
     * @param values
     */
    async function onSubmit(values: BrandNewDish) {
        id ? await editExistingDish(values).then(() => {
            toast({
                className: 'bg-black text-white',
                duration: 2000,
                description: 'Edición completa'
            })
        })
            :
            await createNewDish(values)
                .then(() => {
                    toast({
                        className: 'bg-black text-white',
                        duration: 2000,
                        description: 'Plato creado',
                    })
                    form.reset();
                });
    }
    return (
        <Form {...form}>
            <form autoComplete="off" className="flex flex-col gap-3 h-full" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between gap-3">
                    {/* <DevTool control={control} /> */}
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input className="text-lg" placeholder="Dish name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="kcal"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input className="text-lg" placeholder="kcal" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button variant={"secondary"}
                        className="flex gap-1"
                        type="button"
                        onClick={() => {
                            append({
                                ingredient: { name: '', id: undefined },
                                quantity: '',
                                quantityUnit: '',
                            }, {
                                focusName: `ingredients.${arrayFieldIndex}.ingredient.name`
                            }),
                                setArrayFieldIndex(arrayFieldIndex + 1);
                        }
                        }
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        Ingrediente
                    </Button>
                </div>
                <div className="overflow-scroll flex flex-col gap-3">
                    <FormField
                        control={control}
                        name="recipe"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us about the recipe"
                                        className="resize-y text-lg"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        fields.map((field, index) => (
                            <div key={field.id} className="gap-3 flex flex-col">
                                <div className="flex items-center gap-3">
                                    <FormField
                                        key={field.id}
                                        control={control}
                                        defaultValue={''}
                                        name={`ingredients.${index}.ingredient.name`}
                                        render={({ field }) => (
                                            <FormItem className="flex w-full">
                                                <FormControl className="flex">
                                                    <Input className="w-full text-lg" placeholder="Ingredient name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button className="flex gap-1" variant={'destructive'} type="button" onClick={() => deleteIngredientFromDB(id!, ingredients![index]!.ingredientId!, index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                        Borrar
                                    </Button>
                                </div>
                                <div className="flex gap-3">
                                    <FormField
                                        control={form.control}
                                        name={`ingredients.${index}.quantityUnit`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a measure unit" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {measureUnits.map((unit) => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        key={field.id}
                                        control={form.control}
                                        defaultValue={''}
                                        name={`ingredients.${index}.quantity`}
                                        render={({ field }) => (
                                            <FormItem className="flex w-full">
                                                <FormControl className="flex">
                                                    <Input className="w-full text-lg" placeholder="Ingredient quantity" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        ))
                    }
                </div>
                <Button aria-disabled={isSubmitting} disabled={isSubmitting} type="submit" className="gap-1" variant={"default"}>
                    {!isSubmitting ?
                        <>
                            <SaveIcon size={18} />
                            Guardar receta
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
    );
}
