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
import { archiveUser, verifyUser } from "@/actions/client";

const handleVerify = async (userId: string) => {
  try {
    const response = await verifyUser(userId);

    if (response.success) {
      toast.success(response.message);
      // Optionally, refresh your table or UI here
      window.location.reload();
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.error("Error updating user status:", error);
  }
};

const handleSuspend = async (userId: string) => {
  try {
    const response = await archiveUser(userId);

    if (response.success) {
      toast.success(response.message);
      // Optionally, refresh your table or UI here
      window.location.reload();
    } else {
      toast.error(response.message);
    }
  } catch (error) {
    console.error("Error updating user status:", error);
  }
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
    accessorKey: "totalTimeSpent",
    header: "Visionnage",
    cell: ({ row }) => {
      const user = row.original;
      function formatDurationFromSeconds(seconds: number): string {
        const totalMinutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        const hoursPart = hours > 0 ? `${hours}h` : "";
        const minutesPart = minutes > 0 ? `${minutes}min` : "";
        const secondsPart = remainingSeconds > 0 ? `${remainingSeconds}s` : "";

        return `${hoursPart} ${minutesPart} ${secondsPart}`.trim();
      }

      return (
        <div className="py-1 px-2 rounded-full bg-green-400 font-semibold text-xs text-center text-white">
          {formatDurationFromSeconds(user.totalTimeSpent || 0) || "0s"}
        </div>
      );
    },
  },
  {
    accessorKey: "niveau",
    header: "Niveau",
    cell: ({ row }) => {
      const user = row.original;
      return <div>{user?.grade?.niveau?.name}</div>;
    },
  },
  {
    accessorKey: "classes",
    header: "Classe",
    cell: ({ row }) => {
      const user = row.original;
      return <div>{user?.grade?.name}</div>;
    },
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
              <DialogDescription></DialogDescription>
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
