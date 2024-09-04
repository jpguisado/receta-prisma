import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Suspense, useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { fetchDishList } from "~/server/data-layer";
import { BrandNewDish } from "~/models/types/dish.td";
import { ShoppingDay } from "./client";

export default async function Shopping() {
  
  const listaPlatos: BrandNewDish[] = await fetchDishList();

  // const listaPlatos: BrandNewDish[] = [{
  //   name: 'TORTILLA A MANO',
  //   ingredients: [{ ingredientId: 0, ingredient: { name: '' }, quantity: '0', quantityUnit: '1' }],
  //   recipe: '',
  //   id: 0,
  // }]

  // listaPlatos.map((plato) => plato.name)

  return (
    <>
    <p>Hello</p>
    <p>This is the main part of shopping list</p>
    <Suspense fallback={'...cargando'}>
      <ShoppingDay listaPlatos={listaPlatos}/>
    </Suspense>
    </>
  )
}

