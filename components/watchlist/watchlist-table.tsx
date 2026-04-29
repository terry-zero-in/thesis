"use client";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnDef,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { removeTicker, restoreTicker } from "@/lib/watchlist/actions";
import { formatPrice, formatRelative } from "@/lib/watchlist/format";
import type { MemoStatus, WatchlistRow } from "@/lib/watchlist/types";

import { AddTickerDialog } from "./add-ticker-dialog";
import { ConvictionBadge } from "./conviction-badge";
import { MemoStatusIcon } from "./memo-status-icon";

type Filters = {
  search: string;
  sector: string; // "" = all
  convictionMin: number;
  convictionMax: number;
  memoStatus: "all" | "has" | "pending" | "none";
};

const DEFAULT_FILTERS: Filters = {
  search: "",
  sector: "",
  convictionMin: 1,
  convictionMax: 10,
  memoStatus: "all",
};

export function WatchlistTable({ rows }: { rows: WatchlistRow[] }) {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sorting, setSorting] = useState<SortingState>([
    { id: "symbol", desc: false },
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [, startTransition] = useTransition();
  const searchRef = useRef<HTMLInputElement>(null);

  // Keyboard: N opens add, / focuses search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const inField =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.getAttribute("contenteditable") === "true";
      if (inField) return;
      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setDialogOpen(true);
      } else if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sectors = useMemo(() => {
    const set = new Set<string>();
    for (const r of rows) if (r.sector) set.add(r.sector);
    return Array.from(set).sort();
  }, [rows]);

  const filtered = useMemo(() => {
    const q = filters.search.trim().toUpperCase();
    return rows.filter((r) => {
      if (q) {
        const hay = `${r.symbol} ${r.companyName ?? ""}`.toUpperCase();
        if (!hay.includes(q)) return false;
      }
      if (filters.sector && r.sector !== filters.sector) return false;
      const c = r.conviction ?? 0;
      if (c < filters.convictionMin || c > filters.convictionMax) {
        if (r.conviction != null) return false;
      }
      const memo = matchMemo(r.latestMemoStatus, filters.memoStatus);
      if (!memo) return false;
      return true;
    });
  }, [rows, filters]);

  const handleRemove = (row: WatchlistRow) => {
    startTransition(async () => {
      const result = await removeTicker({ id: row.id });
      if (!result.ok) {
        toast.error(`Failed to remove ${row.symbol}`);
        return;
      }
      toast(`${row.symbol} removed`, {
        action: result.restore
          ? {
              label: "Undo",
              onClick: () => {
                startTransition(async () => {
                  const r = await restoreTicker(result.restore!);
                  if (r.ok) toast.success(`${row.symbol} restored`);
                  else toast.error(`Could not restore ${row.symbol}`);
                });
              },
            }
          : undefined,
        duration: 4000,
      });
    });
  };

  const columns = useMemo<ColumnDef<WatchlistRow>[]>(
    () => [
      {
        accessorKey: "symbol",
        header: "Symbol",
        cell: ({ row }) => (
          <span className="font-mono text-sm tracking-wide tnum">
            {row.original.symbol}
          </span>
        ),
      },
      {
        accessorKey: "companyName",
        header: "Company",
        cell: ({ row }) => (
          <span className="truncate text-sm" title={row.original.companyName ?? undefined}>
            {row.original.companyName ?? "—"}
          </span>
        ),
      },
      {
        id: "price",
        header: () => <span className="text-right block">Price</span>,
        cell: () => (
          <span className="block text-right font-mono tnum text-text-3">—</span>
        ),
      },
      {
        accessorKey: "targetPrice",
        header: () => <span className="text-right block">Target</span>,
        cell: ({ row }) => (
          <span className="block text-right font-mono tnum">
            {formatPrice(row.original.targetPrice)}
          </span>
        ),
      },
      {
        accessorKey: "conviction",
        header: () => <span className="text-center block">Conviction</span>,
        cell: ({ row }) => (
          <div className="text-center">
            <ConvictionBadge value={row.original.conviction} />
          </div>
        ),
      },
      {
        id: "memo",
        header: () => <span className="text-center block">Memo</span>,
        cell: ({ row }) => (
          <div className="flex justify-center">
            <MemoStatusIcon status={row.original.latestMemoStatus} />
          </div>
        ),
      },
      {
        accessorKey: "latestResearchAt",
        header: "Last Research",
        cell: ({ row }) => (
          <span className="text-sm text-text-2">
            {formatRelative(row.original.latestResearchAt)}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex justify-end opacity-0 transition-opacity group-hover:opacity-100">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(row.original);
              }}
              aria-label={`Remove ${row.original.symbol}`}
              className="rounded-md p-1.5 text-text-3 transition-colors hover:bg-surface-hover hover:text-danger"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const table = useReactTable({
    data: filtered,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const isEmpty = rows.length === 0;
  const isFiltered = filtered.length === 0 && rows.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-[220px] flex-1">
          <Input
            ref={searchRef}
            placeholder="Search symbols…"
            value={filters.search}
            onChange={(e) =>
              setFilters((f) => ({ ...f, search: e.target.value }))
            }
            className="h-9"
            aria-label="Search symbols"
          />
        </div>

        <div className="w-[180px]">
          <Select
            value={filters.sector || "all"}
            onValueChange={(v) =>
              setFilters((f) => ({
                ...f,
                sector: v && v !== "all" ? v : "",
              }))
            }
          >
            <SelectTrigger className="h-9">
              <SelectValue placeholder="All sectors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sectors</SelectItem>
              {sectors.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-[260px] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-text-3">
            <span>Conviction</span>
            <span className="font-mono tnum">
              {filters.convictionMin}–{filters.convictionMax}
            </span>
          </div>
          <Slider
            value={[filters.convictionMin, filters.convictionMax]}
            min={1}
            max={10}
            step={1}
            onValueChange={(v) => {
              const arr = Array.isArray(v) ? v : [v, v];
              setFilters((f) => ({
                ...f,
                convictionMin: arr[0],
                convictionMax: arr[1],
              }));
            }}
          />
        </div>

        <div className="w-[160px]">
          <Select
            value={filters.memoStatus}
            onValueChange={(v) =>
              setFilters((f) => ({ ...f, memoStatus: v as Filters["memoStatus"] }))
            }
          >
            <SelectTrigger className="h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All memos</SelectItem>
              <SelectItem value="has">Has memo</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setDialogOpen(true)} className="h-9">
          <Plus className="mr-1.5 size-4" />
          Add ticker
          <kbd className="ml-2 rounded border border-border-subtle bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-text-3">
            N
          </kbd>
        </Button>
      </div>

      {isEmpty ? (
        <EmptyState onAdd={() => setDialogOpen(true)} />
      ) : (
        <div className="overflow-hidden rounded-md border border-border-subtle bg-surface">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="border-border-subtle">
                  {hg.headers.map((h) => {
                    const canSort = h.column.getCanSort();
                    return (
                      <TableHead
                        key={h.id}
                        onClick={canSort ? h.column.getToggleSortingHandler() : undefined}
                        className={`text-xs uppercase tracking-wider text-text-3 ${canSort ? "cursor-pointer select-none" : ""}`}
                      >
                        {h.isPlaceholder
                          ? null
                          : flexRender(h.column.columnDef.header, h.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isFiltered ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center text-sm text-text-3">
                    No matches.
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="group border-border-subtle hover:bg-surface-hover"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <AddTickerDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}

function matchMemo(
  status: MemoStatus,
  filter: Filters["memoStatus"],
): boolean {
  if (filter === "all") return true;
  if (filter === "none") return status === null;
  if (filter === "has")
    return status !== null && status !== "draft" && status !== "pending_approval";
  if (filter === "pending")
    return status === "draft" || status === "pending_approval";
  return true;
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="rounded-md border border-dashed border-border-subtle bg-surface/50 px-6 py-16 text-center">
      <p className="text-sm text-text-1">Your watchlist is empty.</p>
      <p className="mt-1 text-sm text-text-3">
        Add a ticker to start tracking. Press{" "}
        <kbd className="rounded border border-border-subtle bg-surface-2 px-1.5 py-0.5 font-mono text-[10px]">
          N
        </kbd>{" "}
        anytime.
      </p>
      <div className="mt-5">
        <Button onClick={onAdd}>
          <Plus className="mr-1.5 size-4" />
          Add your first ticker
        </Button>
      </div>
    </div>
  );
}
