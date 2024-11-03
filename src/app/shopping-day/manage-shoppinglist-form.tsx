'use client';
import { useState } from "react";
import { z } from "zod";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { markItemAsBought } from "~/server/actions";

export const itemSchema = z.object({
  title: z.string(),
  isBought: z.boolean()
});

export type itemType = z.infer<typeof itemSchema>

export function ManageShoppingListForm({ title, isBought, id, quantity, quantityUnit }: { title: string, isBought: boolean, id: number, quantity: string, quantityUnit: string }) {

  const [itemStatus, setItemStatus] = useState(isBought);

  async function changeItemStatus(id: number, isBought: boolean) {
    setItemStatus(!itemStatus);
    await markItemAsBought(id, isBought)
  }

  return (
    <Card className="flex">
      {itemStatus ?
        <>
          <CardHeader className="w-full">
            <CardTitle className="line-through">{title}</CardTitle>
            <CardDescription className="line-through">{quantity} {quantityUnit}</CardDescription>
          </CardHeader>
          <div onClick={() => changeItemStatus(id, !itemStatus)} className="bg-green-100 w-16 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
        </>
        :
        <>
          <CardHeader className="w-full">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{quantity} {quantityUnit}</CardDescription>
          </CardHeader>
          <div onClick={() => changeItemStatus(id, !itemStatus)} className="bg-slate-100 w-16 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </div>
        </>
      }
    </Card>
  )
}