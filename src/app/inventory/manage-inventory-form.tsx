'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { ShoppingListItemsSchemaDos } from "~/models/schemas/shoppingListItems";
import type { ShoppableItemDosType } from "~/models/types/shoppingListItems.td";
import { addItemsToShoppingList } from "~/server/actions";

export default function ManageInventoryForm({ itemsForThisWeek }: { itemsForThisWeek: ShoppableItemDosType }) {

    const form = useForm<ShoppableItemDosType>({
        // resolver: zodResolver(ShoppingListItemsSchemaDos.array()),
        defaultValues: itemsForThisWeek
    });

    const { control } = form;

    async function onSubmit(values: ShoppableItemDosType) {
        await addItemsToShoppingList(values)

    }


    return (

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={control}
                    name="items"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">Sidebar</FormLabel>
                                <FormDescription>
                                    Select the items you want to display in the sidebar.
                                </FormDescription>
                            </div>
                            {itemsForThisWeek.items.map((item) => (
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
                                                        checked={field.value?.some((field) => JSON.stringify(item) === JSON.stringify(field))}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange()
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                        value => value.name !== item.name
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