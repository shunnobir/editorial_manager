import React from "react";
import { Skeleton } from "./ui/skeleton";
import { TableCell, TableRow } from "./ui/table";
import { Table } from "@tanstack/react-table";

export default function TableLoaderSkeleton<T>({ table }: { table: Table<T> }) {
  return [1, 2, 3, 4, 5].map(() =>
    table.getHeaderGroups().map((headerGroup) => (
      <TableRow key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          return (
            <TableCell key={header.id} className="font-semibold text-black">
              <Skeleton className="w-32 h-6 rounded-sm" />
            </TableCell>
          );
        })}
      </TableRow>
    ))
  );
}
