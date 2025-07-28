import { HelpCircle, Timer, Ban, CheckCircle } from "lucide-react";

export const userStatusOptions = [
  {
    value: "inactive",
    label: "Inexploité",
    icon: HelpCircle,
    className: "bg-yellow-50 border-2 border-yellow-400 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-200",
    color: "text-yellow-500",
  },
  {
    value: "suspended", 
    label: "Suspendu",
    icon: Ban,
    className: "bg-red-50 border-2 border-red-600 text-red-800 dark:bg-red-900 dark:text-red-200",
    color: "text-red-500",
  },
  {
    value: "active",
    label: "Actif",
    icon: CheckCircle,
    className: "bg-green-50 border-2 border-green-600 text-green-800 dark:bg-green-900 dark:text-green-200", 
    color: "text-green-500",
  },
  
];
