"use client";

import type { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import {  utilise } from "@/components/filters";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const globalFilter = table.getState().globalFilter as string;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Rechercher par code, nom ou prénom..."
          value={globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[250px]"
        />
        {table.getColumn("isUsed") && (
          <DataTableFacetedFilter
            column={table.getColumn("isUsed")}
            title="Utilisé"
            options={utilise}
          />
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
