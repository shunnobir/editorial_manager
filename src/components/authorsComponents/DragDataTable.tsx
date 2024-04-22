"use client";
import React,{useState} from "react";
import {
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
import { CheckCircle2, MinusCircle, MoreVertical, XCircle } from "lucide-react";
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
import Paginations from "./Paginations";

export type ShowFiles = {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
};

export const columns: ColumnDef<ShowFiles>[] = [
  {
    accessorKey: "fileName",
    header: "File Name",
    cell: ({ row }) => <div className="">{row.getValue("fileName")}</div>,
  },
  {
    accessorKey: "fileSize",
    header: "File Size",
    cell: ({ row }) => (
      <div className="">{row.getValue("fileSize")}</div>
    ),
  },

  {
    accessorKey: "fileType",
    header: "File Type",
    cell: ({ row }) => <div className="">{row.getValue("fileType")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Copy</DropdownMenuItem>
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem>Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface Files {
  id: string;
  fileName: string;
  fileSize: string;
  fileType: string;
}

interface DragDataTableProps {
  files: Files[];
}



const DragDataTable: React.FC<DragDataTableProps> = ({ files }) => {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [currentPage, setCurrentPage] = React.useState(1);

  const table = useReactTable({
    data:files,
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
      <h1 className="text-3xl font-semibold pt-8">Submissions</h1>
      <p>This is the list of your previous submissions.</p>
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
                  NO PROPOSALS
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

export default DragDataTable;