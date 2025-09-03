// app/(teacher)/teach/live/[id]/page.tsx
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { isTeacher } from "@/lib/roles";

export default async function TeacherLivePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !isTeacher(session.user)) return notFound();

  const live = await prisma.liveRoom.findFirst({
    where: { id: params.id, teacherId: session.user.id },
  });
  if (!live) return notFound();

  async function setStatus(status: "LIVE" | "ENDED") {
    "use server";
    await prisma.liveRoom.update({ where: { id: live?.id }, data: { status } });
  }

  return (
    <div className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">{live.name}</h1>
      <div className="rounded-2xl overflow-hidden aspect-video bg-black">
        {live.youtubeVideoId && (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/mKCieTImjvU&ab_channel?autoplay=0&modestbranding=1&rel=0`}
            title={live.name}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>
      <div className="flex gap-3">
        <form action={setStatus.bind(null, "LIVE")}>
          {" "}
          <Button>Mark Live</Button>
        </form>
        <form action={setStatus.bind(null, "ENDED")}>
          {" "}
          <Button variant="destructive">End</Button>
        </form>
      </div>
      <p className="text-sm text-muted-foreground">
        Use OBS to go live on YouTube. Students see the player on the student
        page below.
      </p>
    </div>
  );
}
