import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthForm from "../_components/LoginForm";

export default async function AuthButton() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }
   if(session && session.user.step <= 1 ){
    redirect("/steps");
  }
  return (
    <div className="">
      <AuthForm />
    </div>
  );
}
