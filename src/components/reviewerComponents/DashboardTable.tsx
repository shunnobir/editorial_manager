"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  Table as TableType,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import PaperStatusBadge from "../PaperStatusBadge";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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
  SubmissionStatus,
  Submission,
} from "@/types.d";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "@/lib/utils";
import Column from "../Column";
import Text from "../Text";
import Row from "../Row";
import { useRouter } from "next/navigation";


export const columns: ColumnDef<Submission>[] = [
  {
    accessorKey: "submission_id",
    header: "Revision ID",
    cell: ({ row }) => (
      <div className="">
        {row.getValue("submission_id")}
      </div>
    ),
  },
  {
    accessorKey: "initial_submission_id",
    header: "Initial Submission ID",
    cell: ({ row }) => (
      <div className="">
        {row.getValue("initial_submission_id")}
      </div>
    ),
  },

  {
    accessorKey: "paper_title",
    header: "Paper Title",
    cell: ({ row }) => <div className="">{row.getValue("paper_title")}</div>,
  },
  {
    accessorKey: "submission_date",
    header: "Submission Date",
    cell: ({ row }) => {
      return (
        <div className="">
          {row.getValue<Date>("submission_date").toString()}
        </div>
      );
    },
  },
  {
    accessorKey: "keywords",
    header: "Keywords",
    cell: ({ row }) => <div className="">{row.getValue("keywords")}</div>,
  },
  
  {
    accessorKey: "status",
    header: "",
    cell: ({ row }) => <Button>{row.getValue("status")}</Button>,
  },
];

type DashboardTableProps = {
  data: Submission[];
  label: string;
  subheading: string;
};

export function DashboardTable({ data, label, subheading }: DashboardTableProps) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [filter, setFilter] = React.useState("");

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const router = useRouter();

  return (
    <div className="w-full gap-[30px]">
      <Column>
        <h1 className="text-3xl font-semibold pt-8">{label}</h1>
        <span>{subheading}</span>
      </Column>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter submissions"
          className="max-w-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div>
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
      {/* will add here pagination*/}
      <DataTablePagination table={table} />
    </div>
  );
}

interface DataTablePaginationProps<TData> {
  table: TableType<TData>;
  className?: string;
}

function DataTablePagination<TData>({
  table,
  className,
}: DataTablePaginationProps<TData>) {
  return (
    <div className={cn("flex items-center justify-center px-2", className)}>
      <div className="flex flex-1 items-center justify-between space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2 flex-1">
          <Text variant="muted" className="text-sm font-medium">
            Rows per page
          </Text>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[1, 2, 3, 4, 5, 10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium gap-2 flex-1">
          <Text variant="muted">Page</Text>
          <Row className="rounded-md border border-solid border-border min-w-[32px] px-1 py-1 items-center justify-center">
            {table.getState().pagination.pageIndex + 1}{" "}
          </Row>
          <Text variant="muted">of</Text>
          <Row className="rounded-md border border-solid border-border min-w-[32px] px-1 py-1 items-center justify-center">
            {table.getPageCount()}
          </Row>
        </div>
        <div className="flex items-center justify-end space-x-2 flex-1">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
