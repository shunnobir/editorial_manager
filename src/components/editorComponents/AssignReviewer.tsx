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
import {
  ArrowLeft,
  ArrowRight,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  Delete,
  DeleteIcon,
  MoreVertical,
  Trash,
  Trash2,
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
  Reviewer,
  AssignedReviewer,
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
import PaperStatusBadge from "../PaperStatusBadge";
import { Badge } from "../ui/badge";
import TableLoaderSkeleton from "../TableLoaderSkeleton";

export type AssignedReviewerType = Reviewer;

export const columns: ColumnDef<AssignedReviewerType>[] = [
  {
    accessorKey: "teacher_id",
    header: "Reviewer ID",
    cell: ({ row }) => <div className="">{row.getValue("teacher_id")}</div>,
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
    accessorKey: "department_name",
    header: "Department",
    cell: ({ row }) => {
      return <div className="">{row.getValue("department_name")}</div>;
    },
  },
  {
    accessorKey: "area_of_interest",
    header: "Area of Interest",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-1">
          {row
            .getValue<string>("area_of_interest")
            .split(",")
            .map((interest, index) => (
              <Badge className="py-1.5 px-3 rounded-sm w-fit" key={index}>
                {interest}
              </Badge>
            ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const props = table.options.meta as any;
      const assigned = props?.assignedReviewers?.find(
        (r: any) => r.teacher_id === row.original.teacher_id
      );

      return (
        <Button
          variant={assigned ? "outline" : "default"}
          size="sm"
          className="items-center gap-2 w-[120px]"
          onClick={() => props?.onAssign(row.original)}
          disabled={assigned || props?.assignedReviewers?.length == 2}
          title={
            props?.assignedReviewers?.length == 2
              ? "Can not assign anymore reviewer(s)"
              : "Assign as a reviewer"
          }
        >
          <CheckCheck size={16} color={assigned ? "black" : "white"} />
          {assigned ? "Assigned" : "Assign"}
        </Button>
      );
    },
  },
];

type AssignReviewerProps = {
  data: AssignedReviewerType[];
  label: string;
  subheading: string;
  showSearch?: boolean;
  itemsPerPage?: number[];
  onAssign: (reviewer: Reviewer) => void;
  assignedReviewers: AssignedReviewer[];
  loading: boolean;
};

export function AssignReviewer({
  data,
  label,
  subheading,
  showSearch = true,
  itemsPerPage = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50],
  onAssign,
  assignedReviewers,
  loading,
}: AssignReviewerProps) {
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
        pageSize: itemsPerPage[0],
        pageIndex: 0,
      },
    },
    meta: {
      onAssign,
      assignedReviewers,
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
            placeholder="Filter submissions"
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
                  NO PROPOSALS
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* will add here pagination*/}
      <DataTablePagination table={table} itemsPerPage={itemsPerPage} />
    </div>
  );
}

interface DataTablePaginationProps<TData> {
  table: TableType<TData>;
  className?: string;
  itemsPerPage?: number[];
}

function DataTablePagination<TData>({
  table,
  className,
  itemsPerPage,
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
