"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import type { Dish } from "~/models/types/dish.td"
import { deleteDishWithId } from "~/server/actions"

export const columns: ColumnDef<Dish>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "Group",
    header: "Group",
  },
  {
    accessorKey: "Ingredients",
    header: "Ingredients",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const dish = row.original
      const deleteDish = deleteDishWithId.bind(null, dish.id!)
      async function removeDish() {
        await deleteDish()
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <Link href={`/dish-list/${dish.id}`}>
            <DropdownMenuItem>
              Edit dish
            </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => removeDish()}>Delete dish</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
