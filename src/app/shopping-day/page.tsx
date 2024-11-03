import { connection } from "next/server";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { fetchElementsOnShoppingList } from "~/server/data-layer";
import { ManageShoppingListForm } from "./manage-shoppinglist-form";

export default async function ShoppingListPage() {
  await connection();

  const fetchShoppingList = await fetchElementsOnShoppingList();

  /**
   * TODO:
   * Handle items elements independently
   */

  return (
    <div className="flex flex-col gap-3">
      <h1>Añade elementos:</h1>
      <form action={""} className="gap-3 flex">
        <Input placeholder="Ingrediente" />
        <Button>Guardar</Button>
      </form>
      <h1>Lista de la compra:</h1>
      {fetchShoppingList.map((item) => {
        return (
        <ManageShoppingListForm
          key={item.id}
          id={item.id}
          title={item.name}
          isBought={item.isBought!}
          quantity={item.quantity}
          quantityUnit={item.quantityUnit}
        />)
      })}
    </div>
  )
}