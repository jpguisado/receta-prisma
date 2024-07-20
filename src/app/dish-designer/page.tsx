'use client';

import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useFieldArray, useForm } from "react-hook-form";
import { dishSchema } from "~/models/schemas/dishSchema";
import { Dish } from "~/models/types/dish.td";

export default function DishDesigner() {
    const { control, register, handleSubmit } = useForm<Dish>({
        resolver: zodResolver(dishSchema),
    });
    const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormProvider)
        name: "ingredientList", // unique name for your Field Array
    });
    const onSubmit = (data: Dish) => console.log(data);
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            HeLLO
            {
                fields.map((field, index) => (
                    <>
                        <input
                            key={field.id} // important to include key with field's id
                            {...register(`ingredientList.${index}`)}
                        />
                        <button type="button" onClick={() => remove(index)}>
                            DELETE
                        </button>
                    </>
                ))
            }
            <button
                type="button"
                onClick={() =>
                    append({
                        name: "",
                        id: 0
                    })
                }
            >
                APPEND
            </button>
        </form>
    );
}