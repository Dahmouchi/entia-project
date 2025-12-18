/* eslint-disable @next/next/no-img-element */

"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BadgeDropdown = ({ user, size }: { user: any; size: any }) => {
  const hours = Number(user?.totalTimeSpent) / 3600;

  const badges = [
    {
      name: "Bronze",
      minHours: 1,
      color: "bg-orange-400",
      img: "/bronz.png",
      description: "1h+ sur la plateforme",
    },
    {
      name: "Silver",
      minHours: 3,
      color: "bg-gray-400",
      img: "/silver.png",
      description: "3h+ sur la plateforme",
    },
    {
      name: "Gold",
      minHours: 5,
      color: "bg-yellow-500",
      img: "/gold.png",
      description: "5h+ sur la plateforme",
    },
    {
      name: "Platinum",
      minHours: 10,
      color: "bg-purple-600",
      img: "/platinum.png",
      description: "10h+ sur la plateforme",
    },
  ];

  // Determine current badge
  const currentBadge =
    [...badges].reverse().find((b) => hours >= b.minHours) || badges[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={` transition-transform duration-300 hover:scale-105`}
        >
          <img
            src={currentBadge.img}
            alt={currentBadge.name}
            className={size === "1" ? "w-14 h-14" : "w-26 h-26"}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-64">
        {badges.map((badge) => (
          <DropdownMenuItem
            key={badge.name}
            className="flex items-center gap-2"
          >
            <img src={badge.img} alt={badge.name} className="w-8 h-8" />
            <div>
              <p className="text-sm font-semibold">{badge.name}</p>
              <p className="text-xs text-gray-600">{badge.description}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default BadgeDropdown;
