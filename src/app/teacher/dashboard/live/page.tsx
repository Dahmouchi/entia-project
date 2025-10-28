// app/(teacher)/live/new/page.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { isTeacher } from "@/lib/roles";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";

export default async function NewLivePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user || !isTeacher(session.user)) redirect("/") ;

  async function createLive(formData: FormData) {
    "use server";
    const name = String(formData.get("name") || "Untitled Live");
    const youtubeVideoId = String(formData.get("youtubeVideoId") || "");

    const live = await prisma.liveRoom.create({
      data: {
        name,
        type: "YOUTUBE",
        status: "SCHEDULED",
        teacherId: session!.user.id,
        youtubeVideoId,
      },
    });

    redirect(`/teacher/dashboard/live/${live.id}`);
  }

  return (
    <div className="mx-auto max-w-xl p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Create YouTube Live</h1>
      <form action={createLive} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Title</Label>
          <input
            name="name"
            id="name"
            placeholder="Algebra II – Chapter 3"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="youtubeVideoId">YouTube Video ID</Label>
          <input
            name="youtubeVideoId"
            id="youtubeVideoId"
            placeholder="e.g. dQw4w9WgXcQ"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </div>
  );
}
