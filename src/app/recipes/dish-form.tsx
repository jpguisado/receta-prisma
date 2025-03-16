'use client';
import { dishSchema } from "~/models/schemas/dish";
import type { DishType } from "~/models/types/dish.type";
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { Input } from "~/components/ui/input";
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "~/components/ui/form"
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import { use } from "react";
import { createNewDish } from "~/server/dish";

export default function DishForm({ dishPromise }: { dishPromise: Promise<DishType> }) {
    const fetchedDish = use(dishPromise)
    const form = useForm<DishType>({
        resolver: zodResolver(dishSchema),
        defaultValues: fetchedDish ?? {
            name: '',
            recipe: '',
            kcal: '',
            ingredientList: [{
                name: '',
                quantity: '',
                quantityUnit: '',
            }],
        },
    })
    const { control, handleSubmit, reset } = form;
    const { fields } = useFieldArray({
        control,
        name: "ingredientList",
        keyName: 'key'
    });
    async function onSubmit(data: DishType) {
        toast("Dish has been created", {
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            )
        });
        if (fetchedDish) {

        } else {
            await createNewDish(data)
            reset()
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex gap-3">
                    <FormField
                        control={control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex flex-col w-full">
                                <FormLabel>Nombre del plato</FormLabel>
                                <FormControl>
                                    <Input placeholder="Teclea el nombre del plato" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Nombre descriptivo del plato
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={control}
                    name="recipe"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Receta</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Describe la receta"
                                    className="resize-y"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Añade las indicaciones necesarias para cocinar este plato
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {fields.map((item, index) => (
                    <div className="flex items-center gap-3" key={item.key}>
                        <FormField
                            control={control}
                            name={`ingredientList.${index}.name`}
                            render={({ field }) => (
                                <div className="flex gap-3 w-full">
                                    <FormItem className="w-full">
                                        <FormLabel>Ingrediente {index}</FormLabel>
                                        <FormControl className="">
                                            <div className="flex gap-1">
                                                <Input
                                                    placeholder="Nombre del ingrediente"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Teclea el nombre del ingrediente
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />
                        <FormField
                            control={control}
                            name={`ingredientList.${index}.quantity`}
                            render={({ field }) => (
                                <div className="flex gap-3 w-full">
                                    <FormItem className="w-full">
                                        <FormLabel>Cantidad del ingrediente {index}</FormLabel>
                                        <FormControl className="">
                                            <div className="flex gap-1">
                                                <Input
                                                    placeholder="Teclea la cantidad"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Indica la cantidad necesaria
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />
                        <FormField
                            control={control}
                            name={`ingredientList.${index}.quantityUnit`}
                            render={({ field }) => (
                                <div className="flex gap-3 w-full">
                                    <FormItem className="w-full">
                                        <FormLabel>Unidad de medida {index}</FormLabel>
                                        <FormControl className="">
                                            <div className="flex gap-1">
                                                <Input
                                                    placeholder="Selecciona unidad"
                                                    className="resize-y"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormDescription>
                                            Selecciona la unidad de medida que aplica al ingrediente
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                </div>
                            )}
                        />
                    </div>
                ))}
                <Button type="submit">Guardar</Button>
            </form>
        </Form>
    )
}