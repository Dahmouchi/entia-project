/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Award, ChevronDown, LogOut, User, User2 } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import BadgeDropdown from "./badges";
const HeaderSubject = (user: any) => {
  const router = useRouter();

  return (
    <div>
      <div className="   relative">
        <div className="absolute -top-10 inset-0 z-0 overflow-hidden">
          <img
            src="/nav.png"
            className="w-full h-full object-cover"
            alt="Header background"
          />
          {/* Optional overlay if you need to darken the background */}
          <div className="absolute inset-0 bg-opacity-20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-50 relative ">
          <div className="flex items-center justify-between py-4 pb-8">
            <img
              onClick={() => router.push("/dashboard")}
              src="/images/logo/logo.png"
              className="h-auto w-30 lg:w-40 cursor-pointer"
              alt=""
            />
           
            <div className="flex items-center space-x-4 bg-white">
               <div>
              <BadgeDropdown user={user} size={"1"}/>
            </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-2 cursor-pointer bg-white">
                    
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">
                        {user.user?.name} {user.user?.prenom}
                      </p>
                        <div className="flex items-center space-x-1 text-gray-500">
                        <p className="text-gray-500">Profil</p>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/profile")}
                    className="cursor-pointer"
                  >
                    <User2 />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="cursor-pointer"
                  >
                    <LogOut />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSubject;
