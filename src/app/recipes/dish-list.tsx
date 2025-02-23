'use client'
import { use } from "react";
import type { DishListType } from "~/models/types/dish.type";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import Link from "next/link";
import { CookingPotIcon, LucideEdit3, ReceiptText } from "lucide-react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "~/components/ui/table"

export default function DishList({ dishList }: { dishList: Promise<DishListType> }) {

    const awaitedDishList = use(dishList)

    return (
        <Table className="">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {awaitedDishList.map((dish) => {
                    return <TableRow key={dish.id}>
                        <TableCell className="font-medium">{dish.id}</TableCell>
                        <TableCell>{dish.name}</TableCell>
                        <TableCell className="text-right"><Link href={`/recipes/${dish.id!.toString()}`}>Editar</Link></TableCell>
                    </TableRow>
                })}
            </TableBody>
        </Table>
    )
}