/* eslint-disable @next/next/no-img-element */

"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";

const CoursContainerInfos = (params: any) => {
  const { cours } = useParams<{ cours: string }>();

  const isActive = params.cours.handle === cours;

  return (
    <div className="relative group">
      {/* <Link
        href={
          params.isLocked
            ? "#" // Disable link if locked
            : params.cours.handle
        }
        className={`block ${
          params.isLocked ? "pointer-events-none grayscale" : ""
        }`}
      >
        <div
          className={`hover:bg-purple-100 hover:bg-opacity-40 p-2 mb-2 rounded-md gap-2 flex md:flex-col lg:flex-row items-center justify-between cursor-pointer bg-opacity-40 ${
            isActive ? "bg-yellow-200" : ""
          }`}
        >
          <Image
            src={params.cours.imageUrl}
            height="100"
            width="100"
            alt={params.cours.title}
            className="rounded-lg"
          />
          <div className={`text-sm ${isActive && "font-medium"}`}>
            {params.cours.title}
          </div>
        </div>
      </Link>*/}

      {params.isLocked && (
        <div className="absolute inset-0 bg-black/40 rounded-md flex flex-row gap-4 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <img
            src="/locked.png"
            className="text-white w-12 h-12"
            alt="locked"
          />
          <Link
            href="/dashboard/payment"
            className=" bg-cover  rounded-full shadow-md shadow-black/50 hover:shadow-lg hover:shadow-yellow-400/50 transition-all duration-200 active:translate-y-px inline-block w-fit"
            style={{ backgroundImage: 'url("/button.jpg")' }}
          >
            <div className="font-bold flex items-center justify-center text-black  rounded-full border-b border-yellow-700 group-active:border-yellow-800 group-active:shadow-inner  px-8 py-2 relative">
              <div className="flex items-center gap-2 whitespace-nowrap transition">
                Rejoignez-nous
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CoursContainerInfos;
