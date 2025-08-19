import { FilterOption } from "@/app/admin/_components/tour-data-table/data-table-faceted-filter";
import { HelpCircle, CheckCircle, UserCheck } from "lucide-react";

export const userStatusOptions = [
   {
    value: "subscribed",
    label: "Abonné",
    icon: CheckCircle,
    className: "bg-blue-50 border-2 border-blue-600 text-blue-800 dark:bg-blue-900 dark:text-blue-200 ",
    color: "text-green-500",
  },
  {
    value: "awaiting",
    label: "En attente",
    icon: HelpCircle,
    className: "bg-yellow-50 border-2 border-yellow-400 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200",
    color: "text-yellow-500",
  },
  {
    value: "verified",
    label: "Vérifié",
    icon: UserCheck,
    className: "bg-green-50 border-2 border-green-600 text-green-800 dark:bg-green-900 dark:text-green-200",
    color: "text-blue-500",
  },
  
];

export const utilise: FilterOption[] = [
  {
    value: "true", // must be string for the filter
    label: "Oui",
    icon: CheckCircle,
  },
  {
    value: "false", // must be string
    label: "Non",
    icon: HelpCircle,
  },
];