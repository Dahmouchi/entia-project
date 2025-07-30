/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "react-toastify";




const handleVerify = (userId: string) => {
 
  
};

const handleSuspend = (userId: string) => {
 
};

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "StatutUser",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Statut
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: (info) => {
      if (info.getValue() === "verified") {
        return (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Vérifié
          </span>
        );
      } else if (info.getValue() === "awaiting") {
        return (
          <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-600/20">
            En attente
          </span>
        );
      }
      return (
        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
          Inscrit
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nom",
  },
   {
    accessorKey: "prenom",
    header: "Prenom",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
   {
    accessorKey: "phone",
    header: "Télé",
  },

  {
    accessorKey: "niveau",
    header: "Niveau",
     cell: ({ row }) => {
      const user = row.original;
      return (
       <div>{user?.grade?.niveau?.name}</div>
      );}
  },
  {
    accessorKey: "classes",
    header: "Classe",
     cell: ({ row }) => {
      const user = row.original;
      return (
       <div>{user?.grade?.name}</div>
      );}
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions rapides</DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleVerify(user.id)}
              >
                Valider
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleSuspend(user.id)}
              >
                Suspendre
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DialogTrigger>
                <DropdownMenuItem>
                  Fiche de l&lsquo;utilisateur
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Fiche d&lsquo;utilisateur</DialogTitle>
              <DialogDescription>
                
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="submit">Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
