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
  ChevronLeft,
  ChevronRight,
  MoreVertical,
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
  AssignedReviewer,
  Reviewer,
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
import TableLoaderSkeleton from "../TableLoaderSkeleton";

export const columns: ColumnDef<AssignedReviewer>[] = [
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
    id: "actions",
    cell: ({ row, table }) => {
      const props = table.options.meta as any;
      return (
        <Button
          variant="destructive"
          size="sm"
          className="items-center gap-2 w-[120px]"
          onClick={() => props?.onRemove(row.original)}
        >
          <Trash2 size={16} color="white" />
          Remove
        </Button>
      );
    },
  },
];

type AssignedTableProps = {
  data: AssignedReviewer[];
  label: string;
  subheading: string;
  onRemove: (reviewer: Reviewer) => void;
  loading: boolean;
};

export function AssignedTable({
  data,
  label,
  subheading,
  onRemove,
  loading,
}: AssignedTableProps) {
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
    meta: {
      onRemove: onRemove,
    },
  });

  const router = useRouter();

  return (
    <div className="w-full gap-[30px]">
      <Column>
        <h1 className="text-3xl font-semibold pt-8">{label}</h1>
        <span>{subheading}</span>
      </Column>

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
                  NO REVIEWERS ASSIGNED
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
