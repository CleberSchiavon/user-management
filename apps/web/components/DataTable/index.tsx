"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/Table";
import { Button } from "../Button";
import { PageMetaDto } from "@repo/types";
import { useState } from "react";
import { Input } from "../Input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paginationMeta?: PageMetaDto;
  filterColumn?: string;
  onPreviousPage?: () => void;
  onNextPage?: () => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  paginationMeta,
  onNextPage,
  filterColumn,
  onPreviousPage,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { getHeaderGroups, getRowModel, getColumn } = useReactTable({
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
      <Input
        placeholder={`Filtro por ${filterColumn}`}
        value={(getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          getColumn(filterColumn).setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
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
          <div className="flex flex-row gap-4">
            <p>
              Página {paginationMeta.page} de {paginationMeta.pageCount}
            </p>
            <p>
              Restam {totalItemsLeft > 0 ? totalItemsLeft : 0} itens para
              visualizar
            </p>
          </div>
          <div className="bg-white flex items-center justify-end space-x-2 py-4 p-4">
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
