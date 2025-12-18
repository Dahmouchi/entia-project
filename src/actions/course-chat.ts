// actions/course-chat.ts
"use server";

import { authOptions } from "@/lib/nextAuth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

// Get current user from session
async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session.user;
}

// Send a message (NO revalidatePath - let client handle updates)
export async function sendCourseMessage(
  courseId: string,
  content: string,
  parentId?: string
) {
  try {
    const user = await getCurrentUser();

    if (!content.trim()) {
      return { error: "Message cannot be empty" };
    }

    // Create message
    const message = await prisma.courseChatMessage.create({
      data: {
        content,
        courseId,
        senderId: user.id,
        parentId,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true,
          },
        },
        replies: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                image: true,
                role: true,
              },
            },
          },
        },
        reads: true,
      },
    });

    // Create notifications for all course participants except sender
    const courseParticipants = await prisma.courseProgress.findMany({
      where: {
        courseId,
        userId: { not: user.id },
      },
      select: { userId: true },
    });

    if (courseParticipants.length > 0) {
      await prisma.courseChatNotification.createMany({
        data: courseParticipants.map((p) => ({
          messageId: message.id,
          userId: p.userId,
        })),
      });
    }

    // Return the message to update client state immediately
    return { success: true, message };
  } catch (error) {
    console.error("Send message error:", error);
    return { error: "Failed to send message" };
  }
}

// Get messages for a course
export async function getCourseMessages(courseId: string) {
  try {
    const user = await getCurrentUser();

    const messages = await prisma.courseChatMessage.findMany({
      where: {
        courseId,
        parentId: null, // Only top-level messages
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
            role: true,
          },
        },
        replies: {
          include: {
            sender: {
              select: {
                id: true,
                name: true,
                image: true,
                role: true,
              },
            },
            reads: {
              where: { userId: user.id },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        reads: {
          where: { userId: user.id },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    return { success: true, messages };
  } catch (error) {
    console.error("Get messages error:", error);
    return { error: "Failed to load messages" };
  }
}

// Mark message as read (NO revalidatePath)
export async function markMessageAsRead(messageId: string) {
  try {
    const user = await getCurrentUser();

    // Check if already read
    const existing = await prisma.courseChatMessageRead.findUnique({
      where: {
        messageId_userId: {
          messageId,
          userId: user.id,
        },
      },
    });

    if (existing) {
      return { success: true, alreadyRead: true };
    }

    // Create read record
    await prisma.courseChatMessageRead.create({
      data: {
        messageId,
        userId: user.id,
      },
    });

    // Mark notification as read
    await prisma.courseChatNotification.updateMany({
      where: {
        messageId,
        userId: user.id,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });

    return { success: true, alreadyRead: false };
  } catch (error) {
    console.error("Mark as read error:", error);
    return { error: "Failed to mark as read" };
  }
}

// Get unread notifications count
export async function getUnreadNotificationsCount(courseId?: string) {
  try {
    const user = await getCurrentUser();

    const where: any = {
      userId: user.id,
      isRead: false,
    };

    if (courseId) {
      where.message = { courseId };
    }

    const count = await prisma.courseChatNotification.count({
      where,
    });

    return { success: true, count };
  } catch (error) {
    console.error("Get notifications count error:", error);
    return { error: "Failed to get notifications count", count: 0 };
  }
}

// Delete message (NO revalidatePath - let client handle)
export async function deleteCourseMessage(messageId: string) {
  try {
    const user = await getCurrentUser();

    const message = await prisma.courseChatMessage.findUnique({
      where: { id: messageId },
      select: { senderId: true, courseId: true },
    });

    if (!message) {
      return { error: "Message not found" };
    }

    // Check if user is sender or admin
    if (message.senderId !== user.id && user.role !== "ADMIN") {
      return { error: "You don't have permission to delete this message" };
    }

    await prisma.courseChatMessage.delete({
      where: { id: messageId },
    });

    return { success: true, messageId };
  } catch (error) {
    console.error("Delete message error:", error);
    return { error: "Failed to delete message" };
  }
}
