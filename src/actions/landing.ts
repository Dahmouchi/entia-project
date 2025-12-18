"use server";

import prisma from "@/lib/prisma";
import { SectionWithFeatures } from "@/lib/secion";
import { Section } from "@prisma/client";
import { uploadImage } from "./cours";

export const getSections = async () => {
  try {
    const sections = await prisma.section.findMany({
      include: {
        featureItems: true,
        levels: {
          include: {
            grades: {
              include: {
                subjects: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      data: sections,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du cours:", error);
    return {
      success: false,
      error: "Erreur interne du serveur lors de la récupération du cours",
    };
  }
};
export const getSectionsIsVisible = async () => {
  try {
    const sections = await prisma.section.findMany({
      where: {
        visible: true,
      },
      orderBy: { order: "asc" },
      include: {
        featureItems: true,
        levels: {
          include: {
            grades: {
              include: {
                subjects: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      data: sections,
    };
  } catch (error) {
    console.error("Erreur lors de la récupération du cours:", error);
    return {
      success: false,
      error: "Erreur interne du serveur lors de la récupération du cours",
    };
  }
};
export const createSection = async (section: SectionWithFeatures) => {
  let backgroundImageUrl: string | null = null;
  if (section.backgroundImageUrl) {
    backgroundImageUrl = await uploadImage(section.backgroundImageUrl);
  }
  let heroImageUrl: string | null = null;
  if (section.heroImageUrl) {
    heroImageUrl = await uploadImage(section.heroImageUrl);
  }
  try {
    const newSection = await prisma.section.create({
      data: {
        key: section.key,
        title: section.title,
        subtitle: section.subtitle,
        description: section.description,
        backgroundImageUrl: backgroundImageUrl,
        designStyleKey: section.designStyleKey,
        order: section.order,
        layoutType: section.layoutType,
        checklistItems: section.checklistItems,
        heroImageUrl: heroImageUrl,
        levels: {
          create: section.levels.map((level) => ({
            name: level.name,
            order: level.order,
            grades: {
              create: level.grades.map((grade) => ({
                name: grade.name,
                order: grade.order,
                subjects: {
                  create: grade.subjects.map((subject) => ({
                    name: subject.name,
                    color: subject.color,
                  })),
                },
              })),
            },
          })),
        },

        visible: section.visible,
        createdAt: section.createdAt,
        updatedAt: section.updatedAt,

        featureItems: {
          create: section.featureItems.map((item) => ({
            title: item.title,
            description: item.description,
            iconName: item.iconName,
            order: item.order,
          })),
        },
      },
    });

    return {
      success: true,
      data: newSection,
    };
  } catch (error) {
    console.error("Erreur lors de la création de la section:", error);
    return {
      success: false,
      error: "Erreur interne du serveur lors de la création de la section",
    };
  }
};

export const updateSection = async (
  sectionId: string,
  section: Partial<SectionWithFeatures>
) => {
  try {
    // 1) Fetch existing section to preserve current image URLs
    const existing = await prisma.section.findUnique({
      where: { id: sectionId },
      include: {
        featureItems: true,
        levels: {
          include: {
            grades: {
              include: { subjects: true },
            },
          },
        },
      },
    });

    if (!existing) {
      return { success: false, error: "Section not found" };
    }

    // 2) Handle images: upload only if new file provided
    let backgroundImageUrl = existing.backgroundImageUrl;
    if (section.backgroundImageUrl instanceof File) {
      backgroundImageUrl = await uploadImage(section.backgroundImageUrl);
    }

    let heroImageUrl = existing.heroImageUrl;
    if (section.heroImageUrl instanceof File) {
      heroImageUrl = await uploadImage(section.heroImageUrl);
    }

    // 3) Remove nested data before recreating it
    await prisma.featureItem.deleteMany({ where: { sectionId } });

    await prisma.levelLanding.deleteMany({
      where: { sectionId },
    });

    // 4) Update main section + recreate nested data
    const updatedSection = await prisma.section.update({
      where: { id: sectionId },
      data: {
        key: section.key ?? existing.key,
        title: section.title ?? existing.title,
        subtitle: section.subtitle ?? existing.subtitle,
        description: section.description ?? existing.description,
        backgroundImageUrl,
        heroImageUrl,
        designStyleKey: section.designStyleKey ?? existing.designStyleKey,
        order: section.order ?? existing.order,
        layoutType: section.layoutType ?? existing.layoutType,
        checklistItems: section.checklistItems ?? existing.checklistItems,
        visible: section.visible ?? existing.visible,

        // Feature Items
        featureItems: {
          create:
            section.featureItems?.map((item) => ({
              title: item.title,
              description: item.description,
              iconName: item.iconName,
              order: item.order,
            })) ?? [],
        },

        // Levels → Grades → Subjects
        levels: {
          create:
            section.levels?.map((lvl) => ({
              name: lvl.name,
              order: lvl.order,
              grades: {
                create: lvl.grades.map((grade) => ({
                  name: grade.name,
                  order: grade.order,
                  subjects: {
                    create: grade.subjects.map((sub) => ({
                      name: sub.name,
                      color: sub.color,
                    })),
                  },
                })),
              },
            })) ?? [],
        },
      },
    });

    return {
      success: true,
      data: updatedSection,
    };
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la section:", error);
    return {
      success: false,
      error: "Erreur interne du serveur lors de la mise à jour de la section",
    };
  }
};

export const deleteSection = async (sectionId: string) => {
  try {
    const deletedSection = await prisma.section.delete({
      where: {
        id: sectionId,
      },
    });

    return {
      success: true,
      data: deletedSection,
    };
  } catch (error) {
    console.error("Erreur lors de la suppression de la section:", error);
    return {
      success: false,
      error: "Erreur interne du serveur lors de la suppression de la section",
    };
  }
};
