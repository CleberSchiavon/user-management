"use client";
import { useState } from "react";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { ArrowRight, ArrowLeft } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { PageMetaDto } from "@repo/types";
import { Button } from "../Button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginationMeta?: PageMetaDto;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  paginationMeta,
  onNextPage,
  onPreviousPage,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: paginationMeta ? paginationMeta.pageCount : 1,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    defaultColumn: {
      size: 100,
    },
    state: {
      columnFilters,
    },
  });

  const headerGroups = getHeaderGroups();
  const rowModel = getRowModel();

  const { hasNextPage, hasPreviousPage, itemCount, take, page } =
    paginationMeta || {};

  const totalItemsLeft = itemCount - page * take;

  return (
    <div className="rounded-md border w-full overflow-x-auto shadow-md bg-white">
      <div className="flex sm:flex-row flex-col items-center content-center">
        {paginationMeta && (
          <div className="bg-white sm:hidden flex gap-2 py-4">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onPreviousPage()}
              disabled={!hasPreviousPage}
              className="text-black"
            >
              <ArrowLeft />
            </Button>
            <Button
              size="icon"
              onClick={() => onNextPage()}
              disabled={!hasNextPage}
            >
              <ArrowRight />
            </Button>
          </div>
        )}
      </div>
      <Table className="min-w-full">
        <TableHeader>
          {headerGroups.map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase bg-gray-100"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rowModel.rows.length ? (
            rowModel.rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="even:bg-gray-50 hover:bg-gray-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-6 py-4 border-b border-gray-200 text-sm text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sem resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {paginationMeta && (
        <div className="flex flex-row justify-between items-center px-4 bg-white">
          <div className="flex sm:flex-row flex-col sm:gap-4 gap-2">
            <p>
              Página {paginationMeta.page} de {paginationMeta.pageCount}
            </p>
            <p>
              Restam {totalItemsLeft > 0 ? totalItemsLeft : 0} itens para
              visualizar
            </p>
          </div>
          <div className="bg-white hidden sm:flex items-center justify-end space-x-2 py-4 p-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onPreviousPage()}
              disabled={!hasPreviousPage}
              className="text-black"
            >
              Voltar página
            </Button>
            <Button
              size="sm"
              onClick={() => onNextPage()}
              disabled={!hasNextPage}
            >
              Avançar página
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
