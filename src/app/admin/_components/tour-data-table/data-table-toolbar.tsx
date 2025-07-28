"use client";

import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { userStatusOptions } from "@/components/filters";

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
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Statut"
            options={userStatusOptions}
          />
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
