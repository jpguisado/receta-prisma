import { z } from "zod";

export const ShoppingListItemsSchema = z.object({
    name: z.string(),
    quantity: z.string(),
    quantityUnit: z.string(),
    isListedInShoppingList: z.boolean().optional()
}).array();

export const ShoppableItemSchema = z.object({
    name: z.string(),
    quantity: z.string(),
    quantityUnit: z.string(),
    isListedInShoppingList: z.boolean()
});

export const ShoppingListItemsSchemaDos = z.object({
    items: ShoppableItemSchema.array()
});