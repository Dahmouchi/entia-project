/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Archive,MoreHorizontal } from "lucide-react";
import { toast } from "react-toastify";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userStatusOptions } from "@/components/filters";
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "code",
    header: "Code",
    cell: ({ row }) => row.getValue("code") ?? "—",
  },

  {
    accessorKey: "user.name", // Not used for value but helps identify
    header: "Nom",
    cell: ({ row }) => {
      const user = row.original.user; // ✅ Access nested user object
      const nom = user?.name ?? "—";
      return <div>{nom}</div>;
    },
  },

  {
    accessorKey: "user.prenom",
    header: "Prénom",
    cell: ({ row }) => {
      const user = row.original.user;
      const prenom = user?.prenom ?? "—";
      return <div>{prenom}</div>;
    },
  },
  {
    accessorKey: "user.email", // Not used for value but helps identify
    header: "Email",
    cell: ({ row }) => {
      const user = row.original.user; // ✅ Access nested user object
      const nom = user?.email ?? "—";
      return <div>{nom}</div>;
    },
  },
  {
    accessorKey: "user.phone",
    header: "Télé",
    cell: ({ row }) => {
      const user = row.original.user;
      const prenom = user?.phone ?? "—";
      return <div>{prenom}</div>;
    },
  },
  {
    accessorKey: "usedAt",
    header: "Date de réservation",
    cell: ({ row }) => {
      if (row.getValue("usedAt")) {
        return (
          <div>
            {new Date(row.getValue("usedAt")).toLocaleString("fr-FR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        );
      } else {
        return "—";
      }
    },
  },
  {
  id: "status", // ✅ Use 'id' instead of accessorKey since we're using accessorFn
  accessorFn: (row) => {
    const user = row.user;
    if (!user) return "inactive";

    return user.statut === false
      ? "suspended"
      : user.statut === true
      ? "active"
      : "inactive";
  },
  header: "Statut",
  cell: ({ row }) => {
    const status = row.getValue("status");

    const statusOption =
      userStatusOptions.find((opt) => opt.value === status) || userStatusOptions[0];

    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusOption.className}`}
      >
        <statusOption.icon className="mr-1.5 h-3 w-3" />
        {statusOption.label}
      </div>
    );
  },
},

  {
    id: "actions",
    cell: ({ row }) => {
      const [open, setOpen] = React.useState(false);
      const code = row.original.code; // Assumes the row has a `code` field

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal className="h-4 w-4 cursor-pointer z-50" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="bg-white p-2 rounded-xl border-2 border-gray-300 z-50 shadow-lg"
          >
            <DropdownMenuLabel className="p-2 text-gray-500 font-bold">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Copier le code */}
            <DropdownMenuItem
              className="p-2 font-medium rounded text-blue-600 hover:bg-gray-100 hover:cursor-pointer focus-visible:outline-0"
              onSelect={(e) => {
                e.preventDefault();
                navigator.clipboard.writeText(code);
                toast.success("Code copié dans le presse-papiers");
              }}
            >
              Copier le code
            </DropdownMenuItem>

            {/* Archiver ou Suspendre */}
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="p-2 font-medium rounded text-amber-600 hover:bg-gray-100 hover:cursor-pointer focus-visible:outline-0"
                  onSelect={(e) => {
                    e.preventDefault();
                    setOpen(true);
                  }}
                >
                  Archiver / Suspendre
                </DropdownMenuItem>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Êtes-vous sûr de vouloir archiver ou suspendre ce code ?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action rendra le code inactif. Vous pourrez le
                    réactiver plus tard si nécessaire.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setOpen(false)}>
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-amber-600 hover:bg-amber-700 focus:ring-amber-600"
                    onClick={async () => {
                      try {
                        // TODO: Add your backend call here
                        // await archiveCode(row.original.id); or suspendCode(row.original.id);

                        toast.success("Code archivé ou suspendu avec succès");
                        setOpen(false);
                        window.location.reload();
                      } catch (error) {
                        toast.error(`Échec de l'action : ${String(error)}`);
                        setOpen(false);
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Archive className="w-4 h-4" />
                      <span>Confirmer</span>
                    </div>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
