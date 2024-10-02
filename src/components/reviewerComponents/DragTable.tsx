"use client";
import React, { useState } from "react";
import {
  CellContext,
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownToLine,
  CheckCircle2,
  File,
  MinusCircle,
  MoreVertical,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Paginations from "../authorsComponents/Paginations";
import { EMFile } from "@/types.d";
import { Attachments } from "./FileUpload";

function ActionComponent({ row }: CellContext<Attachments, unknown>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="p-0 w-52">
        <DropdownMenuLabel className="h-10 flex items-center px-3 py-1 border-b border-solid border-border">
          Actions
        </DropdownMenuLabel>
        <a
          href={`http://localhost:5000/${row.original.attachment_url.substring(
            7
          )}`}
          target="__blank"
        >
          <DropdownMenuItem className="gap-2 cursor-pointer p-2 h-10">
            <File size="16" /> View File
          </DropdownMenuItem>
        </a>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const columns: ColumnDef<Attachments>[] = [
  {
    accessorKey: "attachment_name",
    header: "File Name",
    cell: ({ row }) => {
      return (
        <div className="">
          <a
            href={`http://localhost:5000/${row.original.attachment_url.substring(
              7
            )}`}
            target="__blank"
          >
            {row.getValue("attachment_name")}
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "attachment_size",
    header: "File Size",
    cell: ({ row }) => (
      <div className="">
        {row.getValue("attachment_size")}
        {" KB"}
      </div>
    ),
  },

  {
    accessorKey: "attachment_type",
    header: "File Type",
    cell: ({ row }) => (
      <div className="">{row.getValue("attachment_type")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionComponent,
  },
];

interface DragTableProps {
  attachments: Attachments[];
}

const DragTable: React.FC<DragTableProps> = ({ attachments: files }) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [currentPage, setCurrentPage] = React.useState(1);

  const table = useReactTable({
    data: files,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const totalItems = files.length;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * 5;
  const endIndex = Math.min(startIndex + 5, files.length);
  const currentPageRows = files.slice(startIndex, endIndex);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold pt-8">Files</h1>
      <p>This is the list of your uploaded files.</p>
      <div className="flex items-center py-4">
        <Input placeholder="Filter Uploads" className="max-w-sm" />
      </div>
      <div className="">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-semibold text-black"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  NO FILES
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Paginations
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DragTable;
