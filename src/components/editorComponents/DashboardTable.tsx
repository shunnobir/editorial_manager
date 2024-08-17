"use client";
import * as React from "react";
import {
  CellContext,
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
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ClipboardPenLine,
  Files,
  MoreVertical,
  Search,
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
import PopUp from "./PopUp";
import { AssignedTable } from "./AssignedTable";
import { format } from "date-fns";
import { ReviewerTable } from "./ReviewerTable";
import { AssignedReviewerType, AssignReviewer } from "./AssignReviewer";
import { Axios } from "@/lib/axios";
import { Skeleton } from "../ui/skeleton";
import TableLoaderSkeleton from "../TableLoaderSkeleton";

function ActionComponent({ row }: CellContext<Submission, unknown>) {
  const submission_id = React.useMemo(() => row.original.submission_id, [row]);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [assignedReviewers, setAssignedReviewers] = React.useState<
    AssignedReviewer[]
  >([]);
  const [reviewers, setReviewers] = React.useState<AssignedReviewerType[]>([]);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  const handleAssignReviewerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setModalOpen(true);
  };

  const handleOnAssign = async (reviewer: Reviewer) => {
    if (assignedReviewers.length == 2) return;
    await Axios.post(
      // "http://bike-csecu.com:5000/api/editorial-manager/reviewer/assign-proposal",
      `/editorial-manager/reviewer/assign-proposal`,
      {
        submission_id: row.original.submission_id,
        reviewer_id: reviewer.teacher_id,
        assigned_date: new Date(),
      }
    );
    setAssignedReviewers((prev) => [
      ...prev,
      { ...reviewer, submission_id: row.original.submission_id },
    ]);
  };

  const handleOnRemove = async (reviewer: Reviewer) => {
    if (assignedReviewers.length == 0) return;
    await Axios.delete(
      // "http://bike-csecu.com:5000/api/editorial-manager/reviewer/assigned",
      `/editorial-manager/reviewer/assigned?reviewer_id=${reviewer.teacher_id}&submission_id=${row.original.submission_id}`
    );
    setAssignedReviewers((prev) =>
      prev.filter((r) => r.teacher_id != reviewer.teacher_id)
    );
  };

  React.useEffect(() => {
    const getReviewers = async () => {
      const result = await Axios.get(
        // "http://bike-csecu.com:5000/api/editorial-manager/reviewer",
        `/editorial-manager/reviewer`
      );
      const assignedReviewers = await Axios.get(
        //`http://bike-csecu.com:5000/api/editorial-manager/reviewer/assigned?submission_id=${row.getValue("submission_id")}`
        `/editorial-manager/reviewer/assigned?submission_id=${submission_id}`
      );
      const d = await result.data;
      const dd = await assignedReviewers.data;
      setReviewers(
        (d.reviewers as Reviewer[]).map((r) => ({
          ...r,
          assignedReviewers: dd.reviewers,
        })) as AssignedReviewerType[]
      );
      setAssignedReviewers(dd.reviewers as AssignedReviewer[]);
      setLoading(false);
    };

    getReviewers();
  }, [submission_id]);

  return (
    <>
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
          <DropdownMenuItem
            onClick={handleAssignReviewerClick}
            className="gap-2 cursor-pointer p-2 h-10 mx-1 mt-1"
          >
            <ClipboardPenLine size="16" /> Assign Reviewer
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/submissions/${row.original.submission_id}`)
            }
            className="gap-2 cursor-pointer p-2 h-10 mx-1 mb-1"
          >
            <Files size="16" /> View Submission
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isModalOpen && (
        <ReviewerAssignModal
          reviewers={reviewers}
          assignedReviewers={assignedReviewers}
          setModalOpen={setModalOpen}
          onAssign={handleOnAssign}
          onRemove={handleOnRemove}
          loading={loading}
        />
      )}
    </>
  );
}

function ReviewerAssignModal({
  reviewers,
  assignedReviewers,
  setModalOpen,
  onAssign,
  onRemove,
  loading,
}: {
  reviewers: AssignedReviewerType[];
  assignedReviewers: AssignedReviewer[];
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onAssign: (reviewer: Reviewer) => void;
  onRemove: (reviewer: Reviewer) => void;
  loading: boolean;
}) {
  const [searchText, setSearchText] = React.useState("");

  const filteredData = React.useMemo(() => {
    return reviewers.filter(
      (reviewer) =>
        reviewer.area_of_interest.search(searchText) >= 0 ||
        reviewer.first_name.search(searchText) >= 0 ||
        reviewer.last_name.search(searchText) >= 0 ||
        reviewer.department_name.search(searchText) >= 0 ||
        reviewer.designation.search(searchText) >= 0 ||
        reviewer.title.search(searchText) >= 0 ||
        reviewer.teacher_id.toString().search(searchText) >= 0
    );
  }, [searchText, reviewers]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="flex flex-col bg-background p-8 rounded shadow-lg z-50 w-3/4 gap-4">
        <AssignedTable
          data={assignedReviewers}
          label={`Assigned Reviewers(${assignedReviewers.length}/2)`}
          subheading="This is the list of reviewers assigned for the paper."
          onRemove={onRemove}
          loading={loading}
        />

        {assignedReviewers.length < 2 ? (
          <Row className="border border-solid border-border rounded-md items-center pl-2">
            <Search size={16} className="stroke-muted-foreground" />
            <Input
              type="text"
              className="border-0"
              maxLength={100}
              placeholder="search reviewers by keywords, name or department"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Row>
        ) : null}

        {searchText.length > 0 ? (
          <AssignReviewer
            label="Searched Reviewers"
            subheading="These are the result of your search"
            data={filteredData}
            showSearch={false}
            itemsPerPage={[3]}
            onAssign={onAssign}
            assignedReviewers={assignedReviewers}
            loading={loading}
          />
        ) : null}

        <div className="flex gap-4 mb-4 mt-6">
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export const columns: ColumnDef<Submission>[] = [
  {
    accessorKey: "submission_id",
    header: "Revision ID",
    cell: ({ row }) => <div className="">{row.getValue("submission_id")}</div>,
  },
  {
    accessorKey: "initial_submission_id",
    header: "Initial Submission ID",
    cell: ({ row }) => (
      <div className="">{row.getValue("initial_submission_id") || "N/A"}</div>
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
          {format(row.getValue<Date>("submission_date"), "LLL dd, yyyy")}
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
    id: "actions",
    enableHiding: false,
    cell: ActionComponent,
  },
];

type DashboardTableProps = {
  data: Submission[];
  label: string;
  subheading: string;
  loading?: boolean;
};

export function DashboardTable({
  data,
  label,
  subheading,
  loading,
}: DashboardTableProps) {
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
