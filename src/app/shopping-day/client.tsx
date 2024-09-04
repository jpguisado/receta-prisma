'use client';

import { Suspense, useState } from "react";
import { Button } from "~/components/ui/button";
import type { BrandNewDish } from "~/models/types/dish.td";

export const experimental_ppr = true

export function ShoppingDay( { listaPlatos } ) {
    console.log(listaPlatos)
    const list: BrandNewDish[] = listaPlatos;
    const [state, newState] = useState<BrandNewDish[]>(
      [{
        name: '',
        ingredients: [{ ingredientId: 0, ingredient: { name: '' }, quantity: '0', quantityUnit: '1' }],
        recipe: '',
        id: 0,
      }]
    );
    return (
      <div>
        <h1>Lista de la compra</h1>
        <div>
          <Button onClick={() => newState(list) }>Click on me</Button>
          <Suspense fallback={'...'}>
            {state.map((el) => el.name)}
          </Suspense>
          {/* <Suspense fallback={'estamos cargando'}>
            {dishList[0]?.name}
          </Suspense> */}
        </div>
        {/* <form>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Accept terms and conditions
            </label>
          </div>
          <Button type="submit">Button</Button>
        </form> */}
      </div>
    );
  }
  