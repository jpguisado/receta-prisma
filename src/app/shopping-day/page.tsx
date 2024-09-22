import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { fetchIngredients } from "~/server/data-layer";

export default async function Shopping() {

  const ingredients = await fetchIngredients();

  return (
    <div className="flex flex-col gap-3">
      <h1>Añade elementos:</h1>
      <form action={""} className="gap-3 flex">
        <Input placeholder="Ingrediente" />
        <Button>Guardar</Button>
      </form>
      <h1>Lista de la compra:</h1>
      {ingredients.map((ingredient) => {
        return (
          <div key={ingredient.ingredientId + ingredient.dishId} className="flex items-center space-x-2">
            <Checkbox id={ingredient.ingredientId.toString()} />
            <label
              htmlFor={ingredient.ingredientId.toString()}
              className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {ingredient.ingredient.name}
            </label>
          </div>
        )
      })
      }
    </div>
  )
}