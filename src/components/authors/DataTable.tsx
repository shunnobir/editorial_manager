"use client";
import * as React from "react";
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
const data: Submissions[] = [
  {
    id: "1",
    revisionID: "N/A",
    initialSubmissionID: "ASJ98KJ23",
    paperTitle: "A Review of Innovative Teaching Methods",
    submissionDate: "Feb 20, 2024",
    statusDate: "Mar 16, 2024",
    status: "Accepted",
  },
  {
    id: "2",
    revisionID: "N/A",
    initialSubmissionID: "ASJ98KJ23",
    paperTitle: "A Review of Innovative Teaching Methods",
    submissionDate: "Feb 20, 2024",
    statusDate: "Mar 16, 2024",
    status: "Pending",
  },
  {
    id: "3",
    revisionID: "ASJ98KJ23",
    initialSubmissionID: "ASJ98KJ23",
    paperTitle: "A Review of Innovative Teaching Methods",
    submissionDate: "Feb 20, 2024",
    statusDate: "Mar 16, 2024",
    status: "Rejected",
  },
  {
    id: "4",
    revisionID: "N/A",
    initialSubmissionID: "ASJ98KJ23",
    paperTitle: "A Review of Innovative Teaching Methods",
    submissionDate: "Feb 20, 2024",
    statusDate: "Mar 16, 2024",
    status: "Pending",
  },
];

export type Submissions = {
  id: string;
  revisionID: string;
  initialSubmissionID: string;
  status: "Pending" | "Accepted" | "Rejected";
  statusDate: string;
  submissionDate: string;
  paperTitle: string;
};

export const columns: ColumnDef<Submissions>[] = [
  {
    accessorKey: "revisionID",
    header: "Revision ID",
    cell: ({ row }) => <div className="">{row.getValue("revisionID")}</div>,
  },
  {
    accessorKey: "initialSubmissionID",
    header: "Initial Submission ID",
    cell: ({ row }) => (
      <div className="">{row.getValue("initialSubmissionID")}</div>
    ),
  },

  {
    accessorKey: "paperTitle",
    header: "Paper Title",
    cell: ({ row }) => <div className="">{row.getValue("paperTitle")}</div>,
  },
  {
    accessorKey: "submissionDate",
    header: "Submission Data",
    cell: ({ row }) => <div className="">{row.getValue("submissionDate")}</div>,
  },
  {
    accessorKey: "statusDate",
    header: "Status Date",
    cell: ({ row }) => <div className="">{row.getValue("statusDate")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      let icon;
      let bgColorClass;
      if (row.getValue("status") === 'Accepted') {
        icon = <CheckCircle2 />;
        bgColorClass = "bg-[#059669]";
      } else if (row.getValue("status") === 'Pending') {
        icon = <MinusCircle />;
          bgColorClass = "bg-[#7C3AED]";
      } else {
        icon = <XCircle />;
        bgColorClass = "bg-[#F01217]";
      }
      return (
        <Button className={`btn gap-2 ${bgColorClass}`}>
          {icon}
          {row.getValue("status")}
        </Button>
      );
    },
  },
  
  
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

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

export function DataTable() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

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

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold pt-8">Submissions</h1>
      <p>This is the list of your previous submissions.</p>
      <div className="flex items-center py-4">
        <Input placeholder="Filter submissions" className="max-w-sm" />
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
      <div className="flex items-center justify-center space-x-2 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
