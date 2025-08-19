/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { columns} from "../columnsArchive";
import { DataTable } from "../data-table";
import {  getDashboardUsersArchived } from "@/actions/client";

async function getUsers(): Promise<any[]> {
  const data = await getDashboardUsersArchived();
  return data.data;
}

const Users = async () => {  

    const users: any[] = await getUsers();
    console.log(users)
    return ( 
        <>
        <header className="bg-white flex justify-between items-center">
          <div className="">
            <h1 className="lg:text-3xl font-bold tracking-tight text-gray-900">Utilisateurs</h1>
          </div>
          <div>
            <Link href="/admin/dashboard/users" className="text-sm text-blue-600 hover:underline">
              Voir les utilisateurs actifs
              </Link>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <DataTable columns={columns} data={users} />
          </div>
        </main>
        </>
     );
}
 
export default Users;