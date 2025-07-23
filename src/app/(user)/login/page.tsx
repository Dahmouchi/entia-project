
import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AuthForm from "../_components/LoginForm";

export default async function AuthButton() {
const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div
      className="flex h-screen w-full items-center relative justify-center bg-gray-900 bg-cover bg-bottom bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/5477788/pexels-photo-5477788.jpeg")',
      }}
    >
      <div className="w-full h-full bg-black/20 absolute top-0"></div>
      <div className="rounded-xl bg-gray-300/20 border-2 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-xs max-sm:px-8">
        <div className="text-white">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
