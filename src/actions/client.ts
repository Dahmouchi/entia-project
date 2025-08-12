/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { hash } from "bcrypt";

import { compare } from "bcrypt";

export async function changeAdminPassword(
  id: string,
  oldPassword: string,
  newPassword: string,
  confirmedPassword: string
): Promise<string> {
  // Validate that new password matches the confirmation
  if (newPassword !== confirmedPassword) {
    throw new Error("New password and confirmed password do not match.");
  }

  // Validate password strength
  if (newPassword.length < 6) {
    throw new Error("New password must be at least 6 characters long.");
  }

  // Fetch the user from the database
  const admin = await prisma.user.findUnique({ where: { id } });

  if (!admin || !admin.password) {
    throw new Error("User not found or password is missing.");
  }

  // Verify the old password
  const isMatch = await compare(oldPassword, admin.password); // Ensure `compare` is awaited
  if (!isMatch) {
    throw new Error("Old password does not match.");
  }

  // Hash the new password
  const hashedPassword = await hash(newPassword, 10);

  // Update the password in the database
  try {
    await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return "Password updated successfully.";
  } catch (error: any) {
    throw new Error(
      error.message ||
        "An unexpected error occurred while updating the password."
    );
  }
}
export async function updateUser(
  userId: string,
  name: string,
  prenom: string,
  email: string
) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: userId },
    });
    if (!user) {
      throw new Error("User not found");
    }

    // Update the password in the database
    await prisma.user.update({
      where: { username: userId },
      data: { name, prenom, email },
    });

    return "user updated successfully.";
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw new Error("Failed to retrieve user info");
  }
}
export async function RegisterClient(
  nom: string,
  prenom: string,
  email: string,
  phone: string,
  password: string
) {
  try {
    const hashedPassword = await hash(password, 10);

    const blog = await prisma.user.create({
      data: {
        name: nom,
        username: email,
        prenom: prenom || null,
        email: email || "",
        password: hashedPassword,
        phone: parseInt(phone),
      },
    });

    revalidatePath("/");
    return { success: true, data: blog };
  } catch (error) {
    console.error("Error creating category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function getClientById(id: string) {
  try {
    const client = await prisma.user.findUnique({
      where: { id },
    });
    return client;
  } catch (error) {
    console.error("Error fetching client:", error);
    return null;
  }
}
export async function updateClientProfile1(
  id: string,
  formData: {
    personal: {
      nom: string;
      prenom: string;
      phone: string;
    };
    study: {
      niveau: string;
      codeInscription: string;
    };
  }
) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: formData.personal.nom,
        prenom: formData.personal.prenom,
        phone: parseInt(formData.personal.phone), // assuming phone is number in schema
        StatutUser:"subscribed",
        step: 1, // Set step = 1 to mark profile as completed
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating client profile:", error);
    return null;
  }
}
export async function updateClientProfile2(
  id: string,
  formData: {
    personal: {
      nom: string;
      prenom: string;
      phone: string;
    };
    study: {
      gradeId: string;
      niveau: string;
      codeInscription: string;
    };
  }
) {
  try {
    const code = await prisma.registerCode.findUnique({
      where: { code: formData.study.codeInscription },
    });

    if (!code) {
      throw new Error("Le code d'inscription est invalide.");
    }

    if (code.isUsed) {
      throw new Error("Ce code a déjà été utilisé.");
    }

    // Update the RegisterCode to mark it used and link it to the user
    await prisma.registerCode.update({
      where: { code: formData.study.codeInscription },
      data: {
        isUsed: true,
        usedAt: new Date(),
        user: {
          connect: { id },
        },
      },
    });

    // Update the user with the new info
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        gradeId: formData.study.gradeId,
        emailVerified:new Date(),
        StatutUser:"verified",
        step: 2,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating client profile:", error);
    throw error; // Optional: let the caller catch it and handle UI errors
  }
}

import { authOptions } from "@/lib/nextAuth";
import { getServerSession } from "next-auth";
import { tr } from "date-fns/locale";
export async function getStudentById() {
  try {
    const session = await getServerSession(authOptions);
    if (session) {
      const client = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
          
          grade: {
            include: {
              niveau: true,
              subjects: {
                include: {
                  courses: {
                    orderBy:{ index: "asc" },
                  },
                },
              },
            },
          },
        },
      });
      return client;
    }
  } catch (error) {
    console.error("Error fetching client:", error);
    return null;
  }
}

export async function getDashboardUsers() {
  const users = await prisma.user.findMany({
    include: {
      grade: {
        include:{
          niveau:true,
        }
      },
    },
  });
  return {data:users};
}

export async function getStudentStats(userId: string) {
  // 1. Cours terminés (from CourseProgress)
  const completedCourses = await prisma.courseProgress.count({
    where: { userId, completed: true },
  });

  // 2. Heures d'étude (estimate from completed courses or logs if you track time)
  // For now, let's say each course = 3 hours
  const studyHours = completedCourses * 3;


  // 4. Streak actuel (track login streak, fallback dummy for now)
  // You can implement based on login dates (last 7 consecutive days)
  const streak = await calculateVerificationDays(userId); // optional function below

  return {
    completedCourses,
    studyHours,
    streak,
  };
}

async function calculateVerificationDays(userId: string): Promise<number> {
  // Get the user with emailVerified date
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { emailVerified: true }
  });

  if (!user || !user.emailVerified) {
    return 0; // User not found or email not verified
  }

  // Calculate days since verification
  const verificationDate = new Date(user.emailVerified);
  const currentDate = new Date();
  
  // Reset time components to compare just dates
  verificationDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  // Calculate difference in days
  const timeDifference = currentDate.getTime() - verificationDate.getTime();
  const daysSinceVerification = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return daysSinceVerification >= 0 ? daysSinceVerification : 0;
}

export async function TimerStart(userId: string, sessionDuration: number) {
  try {
    // Update user's totalTimeSpent by incrementing with sessionDuration
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        totalTimeSpent: {
          increment: sessionDuration,
        },
      },
    });

    return { userId: updatedUser.id };
  } catch (error) {
    console.error("Error updating user total time spent:", error);
    throw new Error("Failed to update user total time spent.");
  }
}