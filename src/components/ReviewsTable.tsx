"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { EMReview, Reviewer, Teacher, User } from "@/types.d";
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
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";
import Column from "@/components/Column";
import Row from "@/components/Row";
import Text from "@/components/Text";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import TableLoaderSkeleton from "./TableLoaderSkeleton";

export type ReviewDetailData = EMReview &
  Teacher &
  Pick<User, "first_name" | "last_name" | "email">;

export const columns: ColumnDef<ReviewDetailData>[] = [
  {
    accessorKey: "reviewer_id",
    header: "Reviewer ID",
    cell: ({ row }) => <div className="">{row.original.reviewer_id}</div>,
  },

  {
    accessorKey: "first_name",
    header: "Reviewer Name",
    cell: ({ row }) => (
      <div className="">
        {row.original.designation +
          " " +
          row.getValue("first_name") +
          " " +
          row.original.last_name}
      </div>
    ),
  },
  {
    accessorKey: "review_date",
    header: "Review Date",
    cell: ({ row }) => {
      return (
        <div>{format(row.getValue<Date>("review_date"), "LLL dd, yyyy")}</div>
      );
    },
  },
];

type ReviewTableProps = {
  data: ReviewDetailData[];
  label: string;
  subheading: string;
  showSearch?: boolean;
  itemsPerPage?: number[];
  pageIndex?: number;
  loading?: boolean;
};

export function ReviewTable({
  data,
  label,
  loading,
  subheading,
  showSearch = true,
  itemsPerPage = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50],
  pageIndex = 0,
}: ReviewTableProps) {
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
      pagination: {
        pageSize: itemsPerPage[pageIndex],
        pageIndex: 0,
      },
    },
  });

  const router = useRouter();

  return (
    <div className="w-full gap-[30px]">
      <Column className="mb-4">
        <h1 className="text-3xl font-semibold pt-8">{label}</h1>
        <span>{subheading}</span>
      </Column>
      {showSearch ? (
        <div className="flex items-center py-4">
          <Input
            placeholder={`Filter ${label.toLowerCase()}`}
            className="max-w-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      ) : null}
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
                  onClick={() =>
                    router.push(
                      `/reviews/${row.original.review_id}?submission_id=${row.original.submission_id}`
                    )
                  }
                  className="cursor-pointer"
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
            ) : loading ? (
              <TableLoaderSkeleton table={table} />
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  NO REVIEWS
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* will add here pagination*/}
      <ReviewTablePagination table={table} itemsPerPage={itemsPerPage} />
    </div>
  );
}

interface ReviewTablePaginationProps<TData> {
  table: TableType<TData>;
  className?: string;
  itemsPerPage?: number[];
}

function ReviewTablePagination<TData>({
  table,
  className,
  itemsPerPage,
}: ReviewTablePaginationProps<TData>) {
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
              {itemsPerPage?.map((pageSize) => (
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
