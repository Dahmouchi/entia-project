export const dynamic = "force-dynamic";
export const revalidate = 0;
import AccessDenied from "@/components/access";
import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Timer from "../_components/Timer";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  console.log(session?.user)
   if(!session){
    redirect("/login");
  }
  if(session && session.user.step < 2 ){
    redirect("/steps");
  }
 if (session.user.role !== "USER") {
    return <AccessDenied role={session.user.role} />;
  }
  return (
      <div>
        <Timer user={session.user}/>
        {children}</div>
  );
}
