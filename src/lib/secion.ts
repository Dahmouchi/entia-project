export type ThemeStyle =
  | "modern-dark"
  | "light-minimal"
  | "gradient-bold"
  | "corporate";

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  order: number;
  sectionId: string;
}

export interface Level {
  id: string;
  name: string;
  grades: Grade[];
  order: number;
}
export interface Grade {
  id: string;
  name: string;
  subjects: Subject[];
  order: number;
}
export interface Subject {
  name: string;
  color: string;
}
export interface Section {
  id: string;
  key: string;
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImageUrl?: string;
  designStyleKey: ThemeStyle;
  featureItems: FeatureItem[];
  order: number;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export const SUBJECT_COLORS = [
  "bg-purple-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-amber-400",
  "bg-indigo-400",
  "bg-teal-400",
  "bg-red-400",
  "bg-emerald-400",
  "bg-pink-400",
] as const;
export const AVAILABLE_ICONS = [
  "Award",
  "Briefcase",
  "Globe",
  "GraduationCap",
  "Users",
  "Star",
  "Heart",
  "Zap",
  "Shield",
  "Target",
  "TrendingUp",
  "CheckCircle",
  "Rocket",
  "Lightbulb",
  "BookOpen",
  "Coffee",
  "Code",
  "Camera",
] as const;

export type IconName = (typeof AVAILABLE_ICONS)[number];

export const THEME_OPTIONS: {
  value: ThemeStyle;
  label: string;
  description: string;
}[] = [
  {
    value: "modern-dark",
    label: "Modern Dark",
    description: "Dark background with glowing accents",
  },
  {
    value: "light-minimal",
    label: "Light Minimal",
    description: "Clean white with subtle shadows",
  },
  {
    value: "gradient-bold",
    label: "Gradient Bold",
    description: "Vibrant gradient backgrounds",
  },
  {
    value: "corporate",
    label: "Corporate Classic",
    description: "Professional blues and grays",
  },
];

/**
 * Represents a single individual Feature Item/Card within a section.
 * Corresponds to the 'FeatureItem' Prisma model.
 */
export type FeatureItemType = {
  id: string;
  title: string;
  description: string;
  // This string will correspond to the icon component name on the frontend (e.g., 'Award', 'Briefcase').
  iconName: string;
  order: number;
  sectionId: string;
};

/**
 * Represents a major content block/section on the landing page.
 * Corresponds to the 'Section' Prisma model.
 */
export type SectionType = {
  id: string;
  // A unique identifier for the section (e.g., 'why_choose_enita', 'hero_banner').
  key: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  // URL or path for the background image (e.g., '/Board.png').
  backgroundImageUrl: File | null;
  heroImageUrl: File | null;
  checklistItems: string;
  layoutType: SectionLayout;
  levels: Level[];
  // Key to dictate the frontend design/layout (e.g., 'cards_grid', 'carousel').
  designStyleKey: ThemeStyle;
  order: number;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
};
export type SectionType2 = {
  id: string;
  // A unique identifier for the section (e.g., 'why_choose_enita', 'hero_banner').
  key: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  // URL or path for the background image (e.g., '/Board.png').
  backgroundImageUrl: File | null;
  heroImageUrl: File | null;
  checklistItems: string;
  layoutType: SectionLayout;
  levels: Level[];
  // Key to dictate the frontend design/layout (e.g., 'cards_grid', 'carousel').
  designStyleKey: ThemeStyle;
  order: number;
  visible: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Represents the Section data fetched from the API, including its nested FeatureItems.
 * This is the type you will typically use in your frontend components.
 */
export type SectionWithFeatures = SectionType & {
  // The array of feature items associated with this section.
  featureItems: FeatureItemType[];
  levels: Level[];
};

// --- Optional: Types for creating and updating data (DTS) ---
export type SectionWithFeatures2 = SectionType2 & {
  // The array of feature items associated with this section.
  featureItems: FeatureItemType[];
};
/**
 * Type for creating a new FeatureItem (ID, dates, and sectionId are omitted).
 */
export type CreateFeatureItemDTO = Omit<
  FeatureItemType,
  "id" | "sectionId" | "createdAt" | "updatedAt"
>;

/**
 * Type for creating a new Section (ID and dates are omitted).
 */
export type CreateSectionDTO = Omit<
  SectionType,
  "id" | "createdAt" | "updatedAt"
>;
export type SectionLayout = "feature-grid" | "carousel-cards" | "hero-banner";

export const LAYOUT_OPTIONS: {
  value: SectionLayout;
  label: string;
  description: string;
}[] = [
  {
    value: "feature-grid",
    label: "Grille de fonctionnalités",
    description: "Grille de cartes de fonctionnalités avec des icônes",
  },
  {
    value: "carousel-cards",
    label: "Cartes de carousel",
    description: "Horizontal carousel de cartes de programmes",
  },
  {
    value: "hero-banner",
    label: "Hero Banner",
    description: "Texte à gauche avec une image à droite",
  },
];
