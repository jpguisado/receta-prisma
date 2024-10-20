import type { z } from "zod";
import type { ShoppableItemSchema, ShoppingListItemsSchema, ShoppingListItemsSchemaDos } from "../schemas/shoppingListItems";

export type ShoppingListType = z.infer<typeof ShoppingListItemsSchema>
export type ShoppableItemType = z.infer<typeof ShoppableItemSchema>
export type ShoppableItemDosType = z.infer<typeof ShoppingListItemsSchemaDos>
