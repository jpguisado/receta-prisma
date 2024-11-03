'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Form, FormDescription, FormField, FormItem, FormMessage } from "~/components/ui/form";

export const itemSchema = z.object({
  title: z.string(),
  isBought: z.boolean()
});

export type itemType = z.infer<typeof itemSchema>

const elementoComprado: itemType = {
  title: 'patatas',
  isBought: false
};

export function ManageShoppingListForm() {

  const form = useForm<itemType>({
    resolver: zodResolver(itemSchema),
    defaultValues: elementoComprado
  });

  async function onSubmit(values: itemType) {
    console.log(values);
    // await addItemsToShoppingList(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name={elementoComprado.title}
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormDescription>
                  Marca los ingredientes que no tengas en la nevera y pásalos a la lista de la compra.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Guardar</Button>
      </form>
    </Form>
  )
}
