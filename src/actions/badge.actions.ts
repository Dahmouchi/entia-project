// ============================================
// 1. SERVER ACTIONS - actions/badge.actions.ts
// ============================================

"use server";

import { authOptions } from "@/lib/nextAuth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export interface BadgeCondition {
  hoursRequired?: number;
  coursesRequired?: number;
  quizzesRequired?: number;
  streakRequired?: number;
  scoreRequired?: number;
}

export async function checkEligibleBadges() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) throw new Error("Non autorisé");

  try {
    // Get user stats
    const userStats = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        badges: {
          include: { badge: true },
        },
        // Add your relations for courses, quizzes, etc.
      },
    });

    if (!userStats) throw new Error("Utilisateur non trouvé");

    // Convert seconds to hours
    const totalSeconds = userStats.totalTimeSpent || 0;
    const totalHours = Math.floor(totalSeconds / 3600);

    // Get actual counts from your database
    const completedCourses = 0; // TODO: Replace with actual count from your schema
    const completedQuizzes = 0; // TODO: Replace with actual count from your schema
    const currentStreak = 0; // TODO: Replace with actual streak from your schema

    // Get all badges
    const allBadges = await prisma.badge.findMany();

    // Find eligible badges that user hasn't earned yet
    const earnedBadgeIds = userStats.badges.map((eb) => eb.badgeId);
    const eligibleBadges = [];

    for (const badge of allBadges) {
      if (earnedBadgeIds.includes(badge.id)) continue;

      const condition = badge.condition as BadgeCondition;
      let isEligible = true;

      if (condition.hoursRequired && totalHours < condition.hoursRequired) {
        isEligible = false;
      }
      if (
        condition.coursesRequired &&
        completedCourses < condition.coursesRequired
      ) {
        isEligible = false;
      }
      if (
        condition.quizzesRequired &&
        completedQuizzes < condition.quizzesRequired
      ) {
        isEligible = false;
      }
      if (
        condition.streakRequired &&
        currentStreak < condition.streakRequired
      ) {
        isEligible = false;
      }

      if (isEligible) {
        eligibleBadges.push(badge);
      }
    }

    return {
      success: true,
      eligibleBadges,
      userStats: {
        totalHours,
        totalSeconds,
        completedCourses,
        completedQuizzes,
        currentStreak,
      },
    };
  } catch (error) {
    console.error("Error checking badges:", error);
    return {
      success: false,
      error: "Erreur lors de la vérification des badges",
    };
  }
}

export async function claimBadge(badgeId: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) throw new Error("Non autorisé");

  try {
    // Check if user already has this badge
    const existingBadge = await prisma.earnedBadge.findUnique({
      where: {
        userId_badgeId: {
          userId,
          badgeId,
        },
      },
    });

    if (existingBadge) {
      return { success: false, error: "Badge déjà réclamé" };
    }

    // Verify user is still eligible
    const { eligibleBadges } = await checkEligibleBadges();
    const isEligible = eligibleBadges?.some((b) => b.id === badgeId);

    if (!isEligible) {
      return { success: false, error: "Non éligible pour ce badge" };
    }

    // Create earned badge
    const earnedBadge = await prisma.earnedBadge.create({
      data: {
        userId,
        badgeId,
      },
      include: {
        badge: true,
      },
    });

    return {
      success: true,
      earnedBadge,
    };
  } catch (error) {
    console.error("Error claiming badge:", error);
    return { success: false, error: "Erreur lors de la réclamation du badge" };
  }
}

export async function getUserBadges() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) throw new Error("Non autorisé");

  try {
    const earnedBadges = await prisma.earnedBadge.findMany({
      where: { userId },
      include: { badge: true },
      orderBy: { earnedAt: "desc" },
    });

    return {
      success: true,
      badges: earnedBadges,
    };
  } catch (error) {
    console.error("Error fetching badges:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des badges",
    };
  }
}
export async function getAllBadges() {
  try {
    const badges = await prisma.badge.findMany({});

    return {
      success: true,
      badges,
    };
  } catch (error) {
    console.error("Error fetching badges:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des badges",
    };
  }
}
