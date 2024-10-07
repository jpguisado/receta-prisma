'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Form } from "~/components/ui/form";

const inventorySchema = z.object({
    name: z.string(),
    quantity: z.string(),
    quantityUnit: z.string(),
    isListedInShoppingList: z.boolean()
})

type InventoryType = z.infer<typeof inventorySchema>

const FormSchema = z.object({
    items: z.array(z.string()),
})

export default function ManageInventoryForm({ ingredientsOfTheWeek }: { ingredientsOfTheWeek: InventoryType[] }) {

    /**
     * Manages the form for a plannedMeal
     */
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            items: [],
        }
    });

    /**
     *
     * @param values
     */
    async function onSubmit(values: z.infer<typeof FormSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="items"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Sidebar</FormLabel>
                                <FormDescription>
                                    Select the items you want to display in the sidebar.
                                </FormDescription>
                            </div>
                            {ingredientsOfTheWeek.map((item) => (
                                <FormField
                                    key={item.name}
                                    control={form.control}
                                    name="items"
                                    render={({ field }) => {
                                        return (
                                            <FormItem
                                                key={item.name}
                                                className="flex flex-row items-start space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value?.includes(item.name)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, item.name])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        (value) => value !== item.name
                                                                    )
                                                                )
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {item.name}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    }}
                                />
                            ))}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}