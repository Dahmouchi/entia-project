// prisma/seed-badges.ts
// Run with: npx tsx prisma/seed-badges.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const badges = [
  {
    name: "Débutant",
    description: "Commence ton aventure",
    icon: "🌱",
    condition: {
      hoursRequired: 1,
    },
  },
  {
    name: "Étudiant Assidu",
    description: "5 heures d'apprentissage",
    icon: "📚",
    condition: {
      hoursRequired: 5,
    },
  },
  {
    name: "Passionné",
    description: "10 heures d'apprentissage",
    icon: "🔥",
    condition: {
      hoursRequired: 10,
    },
  },
  {
    name: "Expert",
    description: "25 heures d'apprentissage",
    icon: "⭐",
    condition: {
      hoursRequired: 25,
    },
  },
  {
    name: "Maître",
    description: "50 heures d'apprentissage",
    icon: "👑",
    condition: {
      hoursRequired: 50,
    },
  },
  {
    name: "Légende",
    description: "100 heures d'apprentissage",
    icon: "🏆",
    condition: {
      hoursRequired: 100,
    },
  },
  {
    name: "Quiz Master",
    description: "Complète 10 quizzes",
    icon: "🎯",
    condition: {
      quizzesRequired: 10,
    },
  },
  {
    name: "Perfectionniste",
    description: "Score parfait sur 5 quizzes",
    icon: "💯",
    condition: {
      quizzesRequired: 5,
      scoreRequired: 100,
    },
  },
  {
    name: "Marathon",
    description: "Série de 7 jours",
    icon: "🏃",
    condition: {
      streakRequired: 7,
    },
  },
  {
    name: "Infatigable",
    description: "Série de 30 jours",
    icon: "💪",
    condition: {
      streakRequired: 30,
    },
  },
  {
    name: "Explorateur",
    description: "Complète 5 matières",
    icon: "🗺️",
    condition: {
      coursesRequired: 5,
    },
  },
  {
    name: "Polyvalent",
    description: "Complète 10 matières",
    icon: "🎓",
    condition: {
      coursesRequired: 10,
    },
  },
  {
    name: "Lève-tôt",
    description: "Étudie avant 8h du matin",
    icon: "🌅",
    condition: {
      // Custom condition - you'll need to implement this
    },
  },
  {
    name: "Noctambule",
    description: "Étudie après 22h",
    icon: "🌙",
    condition: {
      // Custom condition - you'll need to implement this
    },
  },
  {
    name: "Premier Pas",
    description: "Termine ton premier cours",
    icon: "👣",
    condition: {
      coursesRequired: 1,
    },
  },
];

async function seedBadges() {
  console.log("🌱 Seeding badges...");

  try {
    // Delete existing badges (optional - comment out if you want to keep existing)
    // await prisma.earnedBadge.deleteMany({});
    // await prisma.badge.deleteMany({});

    // Create badges
    for (const badge of badges) {
      // Check if badge exists by name
      const existingBadge = await prisma.badge.findFirst({
        where: { name: badge.name },
      });

      if (existingBadge) {
        // Update existing badge
        const updated = await prisma.badge.update({
          where: { id: existingBadge.id },
          data: badge,
        });
        console.log(`✅ Updated badge: ${updated.name}`);
      } else {
        // Create new badge
        const created = await prisma.badge.create({
          data: badge,
        });
        console.log(`✅ Created badge: ${created.name}`);
      }
    }

    console.log("✨ Badges seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding badges:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedBadges();