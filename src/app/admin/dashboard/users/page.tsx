/* eslint-disable @typescript-eslint/no-explicit-any */
import { columns} from "./columns";
import { DataTable } from "./data-table";
import { getDashboardUsers } from "@/actions/client";

async function getUsers(): Promise<any[]> {
  const data = await getDashboardUsers();
  return data.data;
}

const Users = async () => {  

    const users: any[] = await getUsers();
    console.log(users)
    return ( 
        <>
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Utilisateurs</h1>
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